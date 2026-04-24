import { useState } from "react"

type Props = {
    onSave: (a: number, b: number, c: number, d: number) => void
}

function CubicInput({ onSave }: Props) {
    const [a, setA] = useState(0)
    const [b, setB] = useState(0)
    const [c, setC] = useState(0)
    const [d, setD] = useState(0)

    function handleSave() {
        onSave(a, b, c, d)
    }

    return (
        <div className="flex items-end gap-4">

            {/* a input */}
            <div className="flex flex-col">
                <label className="text-sm mb-1">a-value:</label>
                <input
                    type="number"
                    value={a}
                    onChange={(e) => setA(Number(e.target.value) || 0)}
                    className="border border-gray-400 rounded p-2 w-36"
                />
            </div>

            {/* b input */}
            <div className="flex flex-col">
                <label className="text-sm mb-1">b-value:</label>
                <input
                    type="number"
                    value={b}
                    onChange={(e) => setB(Number(e.target.value) || 0)}
                    className="border border-gray-400 rounded p-2 w-36"
                />
            </div>

            {/* c input */}
            <div className="flex flex-col">
                <label className="text-sm mb-1">c-value:</label>
                <input
                    type="number"
                    value={c}
                    onChange={(e) => setC(Number(e.target.value) || 0)}
                    className="border border-gray-400 rounded p-2 w-36"
                />
            </div>

            {/* d input */}
            <div className="flex flex-col">
                <label className="text-sm mb-1">d-value:</label>
                <input
                    type="number"
                    value={d}
                    onChange={(e) => setD(Number(e.target.value) || 0)}
                    className="border border-gray-400 rounded p-2 w-36"
                />
            </div>

            {/* save */}
            <button
                onClick={handleSave}
                className="bg-orange-500 text-white rounded p-2 px-4 cursor-pointer"
            >
                Save
            </button>

        </div>
    )
    
}

export default CubicInput