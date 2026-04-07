
type Props = {
    a: number
    b: number
    c: number
    d: number
}
function CubicEquation({ a, b, c, d }: Props) {

    return (

        <div className="text-center my-4">
            <p className="text-lg font-bold">
                {`${a}x³ + ${b}x² + ${c}x + ${d} = 0`}
            </p>

        </div>
    )

}

export default CubicEquation