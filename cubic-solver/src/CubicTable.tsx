
type Props = {
  a: number
  b: number
  c: number
  d: number
}

function CubicTable({ a, b, c, d }: Props) {

  // calculate p, q and discriminant
  const p = (3 * a * c - b * b) / (3 * a * a)
  const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a)
  const discriminant = (q * q / 4) + (p * p * p / 27)


  let root1: number | string = 0
  let root2: number | string = 0
  let root3: number | string = 0

  // one real root, two complex roots
  if (discriminant > 0) {
    const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant))
    const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant))
    root1 = u + v - b / (3 * a)
    root2 = "Complex Number"
    root3 = "Complex Number"

  // repeated roots
  } else if (discriminant === 0) {
    root1 = 2 * Math.cbrt(-q / 2) - b / (3 * a)
    root2 = -Math.cbrt(-q / 2) - b / (3 * a)
    root3 = root2

  // three distinct real roots
  } else {
    const r = Math.sqrt(-(p * p * p) / 27)
    const theta = Math.acos(-q / (2 * r))
    const m = 2 * Math.cbrt(r)
    root1 = m * Math.cos(theta / 3) - b / (3 * a)
    root2 = m * Math.cos((theta + 2 * Math.PI) / 3) - b / (3 * a)
    root3 = m * Math.cos((theta + 4 * Math.PI) / 3) - b / (3 * a)
  }

  return (
    // this div adds some space above the table
    <div className="mt-6">

      <table className="w-full border-collapse">

        {/* table header row */}
        <thead>
          <tr className="bg-orange-500 text-white">
            <th className="p-2 text-left">Value</th>
            <th className="p-2 text-left">x</th>
            <th className="p-2 text-left">y</th>
          </tr>
        </thead>

        <tbody>

          {/* p row */}
          <tr className="border-b border-gray-300">
            <td className="p-2">p</td>
            <td className="p-2">{p.toFixed(2)}</td>
            <td className="p-2"></td>
          </tr>

          {/* q row */}
          <tr className="border-b border-gray-300">
            <td className="p-2">q</td>
            <td className="p-2">{q.toFixed(2)}</td>
            <td className="p-2"></td>
          </tr>

          {/* discriminant row */}
          <tr className="border-b border-gray-300">
            <td className="p-2">Discriminant</td>
            <td className="p-2">{discriminant.toFixed(2)}</td>
            <td className="p-2"></td>
          </tr>

          {/* root 1 row */}
          <tr className="border-b border-gray-300">
            <td className="p-2">Root 1</td>
            <td className="p-2">{typeof root1 === "number" ? root1.toFixed(2) : root1}</td>
            <td className="p-2">{typeof root1 === "number" ? "0" : ""}</td>
          </tr>

          {/* root 2 row */}
          <tr className="border-b border-gray-300">
            <td className="p-2">Root 2</td>
            <td className="p-2">{typeof root2 === "number" ? root2.toFixed(2) : root2}</td>
            <td className="p-2">{typeof root2 === "number" ? "0" : ""}</td>
          </tr>

          {/* root 3 row */}
          <tr>
            <td className="p-2">Root 3</td>
            <td className="p-2">{typeof root3 === "number" ? root3.toFixed(2) : root3}</td>
            <td className="p-2">{typeof root3 === "number" ? "0" : ""}</td>
          </tr>

        </tbody>
      </table>
    </div>
  )
}

// This makes the component available to other files
export default CubicTable