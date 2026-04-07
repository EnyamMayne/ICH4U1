import { useState } from "react"
import CubicInput from "./CubicInput"
import CubicEquation from "./CubicEquation"
import CubicTable from "./CubicTable"
import CubicGraph from "./CubicGraph"
import CubicHistory from "./CubicHistory"

type HistoryEntry = {
  a: number
  b: number
  c: number
  d: number
}

function App() {
  
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [c, setC] = useState(0)
  const [d, setD] = useState(0)

  // the list 
  const [history, setHistory] = useState<HistoryEntry[]>([])

  // Save 
  function handleSave(newA: number, newB: number, newC: number, newD: number) {
    setA(newA)
    setB(newB)
    setC(newC)
    setD(newD)
    setHistory([...history, { a: newA, b: newB, c: newC, d: newD }])
  }

  // history row 
  function handleHistorySelect(entry: HistoryEntry) {
    setA(entry.a)
    setB(entry.b)
    setC(entry.c)
    setD(entry.d)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white rounded-xl p-10 w-[900px]">
        <h1 className="text-orange-500 text-4xl text-center mb-8 font-bold">Cubic Solver</h1>
        <CubicInput onSave={handleSave} />
        <CubicEquation a={a} b={b} c={c} d={d} />
        <CubicTable a={a} b={b} c={c} d={d} />
        <CubicGraph a={a} b={b} c={c} d={d} />
        <CubicHistory history={history} onSelect={handleHistorySelect} />
      </div>
    </div>
  )
}

export default App