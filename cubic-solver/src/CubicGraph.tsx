
import { useRef, useEffect } from "react"

type Props = {
    a: number
    b: number
    c: number
    d: number
}
function CubicGraph({ a, b, c, d }: Props) {
    
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const width = canvas.width
        const height = canvas.height

        // clear the canvas before redrawing
        ctx.clearRect(0, 0, width, height)

        // draw white background
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, width, height)

        const originX = width / 2
        const originY = height / 2
        const scale = 30

        // draw x axis
        ctx.beginPath()
        ctx.moveTo(0, originY)
        ctx.lineTo(width, originY)
        ctx.strokeStyle = "black"
        ctx.stroke()

        // draw y axis
        ctx.beginPath()
        ctx.moveTo(originX, 0)
        ctx.lineTo(originX, height)
        ctx.strokeStyle = "black"
        ctx.stroke()

        // draw the cubic curve - exactly the same as your vanilla JS
        ctx.beginPath()
        ctx.strokeStyle = "red"
        for (let px = 0; px < width; px++) {
            const x = (px - originX) / scale
            const y = a * x * x * x + b * x * x + c * x + d
            const py = originY - y * scale
            if (px === 0) {
                ctx.moveTo(px, py)
            } else {
                ctx.lineTo(px, py)
            }
        }
        ctx.stroke()

    }, [a, b, c, d])

    return (
        <div className="mt-6">

            <canvas ref={canvasRef} width={600} height={400} />
        </div>
    )
}
export default CubicGraph