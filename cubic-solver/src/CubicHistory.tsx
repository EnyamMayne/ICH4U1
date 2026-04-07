
type HistoryEntry = {
    a: number
    b: number
    c: number
    d: number
}
type Props = {
    history: HistoryEntry[]
    onSelect: (entry: HistoryEntry) => void
}
function CubicHistory({ history, onSelect }: Props) {
    return (
        <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">History</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-orange-500 text-white">
                        <th className="p-2 text-left">a</th>
                        <th className="p-2 text-left">b</th>
                        <th className="p-2 text-left">c</th>
                        <th className="p-2 text-left">d</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((entry, index) => (
                        <tr
                            key={index}
                            onClick={() => onSelect(entry)}
                            className="border-b border-gray-300 cursor-pointer hover:bg-orange-100"
                        >
                            <td className="p-2">{entry.a}</td>
                            <td className="p-2">{entry.b}</td>
                            <td className="p-2">{entry.c}</td>
                            <td className="p-2">{entry.d}</td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    )

}

export default CubicHistory