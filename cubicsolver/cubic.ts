const aInput = document.getElementById("a-value") as HTMLInputElement | null;
const bInput = document.getElementById("b-value") as HTMLInputElement | null;
const cInput = document.getElementById("c-value") as HTMLInputElement | null;
const dInput = document.getElementById("d-value") as HTMLInputElement | null;
const solveBtn = document.getElementById("solve-btn") as HTMLButtonElement | null;
const results = document.getElementById("results") as HTMLDivElement | null;

if (solveBtn) {
    solveBtn.addEventListener("click", () => {
        // get the values from the input boxes
        const a = parseFloat(aInput ? aInput.value || "0" : "0");
        const b = parseFloat(bInput ? bInput.value || "0" : "0");
        const c = parseFloat(cInput ? cInput.value || "0" : "0");
        const d = parseFloat(dInput ? dInput.value || "0" : "0");

        // calculate p, q and discriminant using formula
        const p = (3 * a * c - b * b) / (3 * a * a);
        const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
        const discriminant = (q * q / 4) + (p * p * p / 27);

        // one real root, two complex roots
        if (discriminant > 0) {
            const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
            const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
            const root1 = u + v - b / (3 * a);
            const root2 = "Complex Number";
            const root3 = "Complex Number";
            displayResults(p, q, discriminant, root1, root2, root3);
            drawGraph(a, b, c, d);

            // repeated roots
        } else if (discriminant === 0) {
            const root1 = 2 * Math.cbrt(-q / 2) - b / (3 * a);
            const root2 = -Math.cbrt(-q / 2) - b / (3 * a);
            const root3 = root2;
            displayResults(p, q, discriminant, root1, root2, root3);
            drawGraph(a, b, c, d);

            // three distinct real roots
        } else {
            const r = Math.sqrt(-(p * p * p) / 27);
            const theta = Math.acos(-q / (2 * r));
            const m = 2 * Math.cbrt(r);
            const root1 = m * Math.cos(theta / 3) - b / (3 * a);
            const root2 = m * Math.cos((theta + 2 * Math.PI) / 3) - b / (3 * a);
            const root3 = m * Math.cos((theta + 4 * Math.PI) / 3) - b / (3 * a);
            displayResults(p, q, discriminant, root1, root2, root3);
            drawGraph(a, b, c, d);
        }
    });

    function displayResults(p: number, q: number, discriminant: number, root1: number | string, root2: number | string, root3: number | string): void {
        // show the results table
        if (results) {
            results.style.display = "block";
        }

        // fill in p, q and discriminant
        const pCell = document.getElementById("p-value") as HTMLTableCellElement | null;
        const qCell = document.getElementById("q-value") as HTMLTableCellElement | null;
        const discCell = document.getElementById("discriminant-value") as HTMLTableCellElement | null;

        if (pCell) pCell.innerText = p.toFixed(2);
        if (qCell) qCell.innerText = q.toFixed(2);
        if (discCell) discCell.innerText = discriminant.toFixed(2);

        // grab the root table cells
        const root1x = document.getElementById("root1-x") as HTMLTableCellElement | null;
        const root2x = document.getElementById("root2-x") as HTMLTableCellElement | null;
        const root3x = document.getElementById("root3-x") as HTMLTableCellElement | null;
        const root1y = document.getElementById("root1-y") as HTMLTableCellElement | null;
        const root2y = document.getElementById("root2-y") as HTMLTableCellElement | null;
        const root3y = document.getElementById("root3-y") as HTMLTableCellElement | null;

        // fill in root 1
        if (root1x) {
            if (typeof root1 === "number") {
                root1x.innerText = root1.toFixed(2);
            } else {
                root1x.innerText = root1;
            }
        }

        // fill in root 2
        if (root2x) {
            if (typeof root2 === "number") {
                root2x.innerText = root2.toFixed(2);
            } else {
                root2x.innerText = root2;
            }
        }

        // fill in root 3
        if (root3x) {
            if (typeof root3 === "number") {
                root3x.innerText = root3.toFixed(2);
            } else {
                root3x.innerText = root3;
            }
        }

        // fill in y values (0 for real roots, empty for complex)
        if (root1y) root1y.innerText = typeof root1 === "number" ? "0" : "";
        if (root2y) root2y.innerText = typeof root2 === "number" ? "0" : "";
        if (root3y) root3y.innerText = typeof root3 === "number" ? "0" : "";
    }

    function drawGraph(a: number, b: number, c: number, d: number): void {
        const canvas = document.getElementById("graph") as HTMLCanvasElement | null;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        // draw background
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);

        // draw equation
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText(`${a}x³ + ${b}x² + ${c}x + ${d} = 0`, 10, 20);

        const originX = width / 2;
        const originY = height / 2;
        const scale = 30;

        // draw x axis
        ctx.beginPath();
        ctx.moveTo(0, originY);
        ctx.lineTo(width, originY);
        ctx.strokeStyle = "black";
        ctx.stroke();

        // draw y axis
        ctx.beginPath();
        ctx.moveTo(originX, 0);
        ctx.lineTo(originX, height);
        ctx.strokeStyle = "black";
        ctx.stroke();

        // draw curve
        ctx.beginPath();
        ctx.strokeStyle = "red";
        for (let px = 0; px < width; px++) {
            const x = (px - originX) / scale;
            const y = a * x * x * x + b * x * x + c * x + d;
            const py = originY - y * scale;
            if (px === 0) {
                ctx.moveTo(px, py);
            } else {
                ctx.lineTo(px, py);
            }
        }
        ctx.stroke();
    }
}