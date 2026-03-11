const aInput = document.getElementById("a-value") as HTMLInputElement | null;
const bInput = document.getElementById("b-value") as HTMLInputElement | null;
const cInput = document.getElementById("c-value") as HTMLInputElement | null;
const dInput = document.getElementById("d-value") as HTMLInputElement | null;
const solveBtn = document.getElementById("solve-btn") as HTMLButtonElement | null;
const results = document.getElementById("results") as HTMLDivElement | null;

solveBtn?.addEventListener("click", () => {
    const a = parseFloat(aInput?.value ?? "0");
    const b = parseFloat(bInput?.value ?? "0");
    const c = parseFloat(cInput?.value ?? "0");
    const d = parseFloat(dInput?.value ?? "0");
    
    const p = (3*a*c - b*b) / (3*a*a);
    const q = (2*b*b*b - 9*a*b*c + 27*a*a*d) / (27*a*a*a);
    const discriminant = (q*q/4) + (p*p*p/27);

    if (discriminant > 0) {
        const u = Math.cbrt(-q/2 + Math.sqrt(discriminant));
        const v = Math.cbrt(-q/2 - Math.sqrt(discriminant));
        const root1 = u + v - b/(3*a);
        const root2 = "Complex Number";
        const root3 = "Complex Number";
        displayResults(root1, root2, root3);
    } else if (discriminant === 0) {
        const root1 = 2 * Math.cbrt(-q/2) - b/(3*a);
        const root2 = -Math.cbrt(-q/2) - b/(3*a);
        const root3 = root2;
        displayResults(root1, root2, root3);
    } else {
        const r = Math.sqrt(-(p*p*p)/27);
        const theta = Math.acos(-q/(2*r));
        const m = 2 * Math.cbrt(r);
        const root1 = m * Math.cos(theta/3) - b/(3*a);
        const root2 = m * Math.cos((theta + 2*Math.PI)/3) - b/(3*a);
        const root3 = m * Math.cos((theta + 4*Math.PI)/3) - b/(3*a);
        displayResults(root1, root2, root3);
    }
});

function displayResults(root1: number | string, root2: number | string, root3: number | string): void {
    if (results) {
        results.style.display = "block";
    }
    const root1x = document.getElementById("root1-x") as HTMLTableCellElement | null;
    const root2x = document.getElementById("root2-x") as HTMLTableCellElement | null;
    const root3x = document.getElementById("root3-x") as HTMLTableCellElement | null;
    const root1y = document.getElementById("root1-y") as HTMLTableCellElement | null;
    const root2y = document.getElementById("root2-y") as HTMLTableCellElement | null;
    const root3y = document.getElementById("root3-y") as HTMLTableCellElement | null;

    if (root1x) {
        if (typeof root1 === "number") {
            root1x.innerText = root1.toFixed(2);
        } else {
            root1x.innerText = root1;
        }
    }
    if (root2x) {
        if (typeof root2 === "number") {
            root2x.innerText = root2.toFixed(2);
        } else {
            root2x.innerText = root2;
        }
    }
    if (root3x) {
        if (typeof root3 === "number") {
            root3x.innerText = root3.toFixed(2);
        } else {
            root3x.innerText = root3;
        }
    }
    if (root1y) root1y.innerText = typeof root1 === "number" ? "0" : "";
    if (root2y) root2y.innerText = typeof root2 === "number" ? "0" : "";
    if (root3y) root3y.innerText = typeof root3 === "number" ? "0" : "";
}