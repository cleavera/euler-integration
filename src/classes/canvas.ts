export class Canvas {
    private _context: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;
    private _width!: number;
    private _height!: number;
    private _instructions: Array<() => void> = [];

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;

        const context = canvas.getContext('2d');

        if (context === null) {
            throw new Error('Could not get canvas context 2d');
        }

        this._context = context;
        this.onResize();
    }

    public redraw(): void {
        this._clear();
        this._instructions.forEach((instruction: () => void) => {
            instruction();
        });
    }

    public onResize(): void {
        this._width = this._canvas.getBoundingClientRect().width;
        this._height = this._canvas.getBoundingClientRect().height;
        this._canvas.width = this._width;
        this._canvas.height = this._height;
    }

    public arc(x: number, y: number, radius: number, startAngle: number, endAngle: number): void {
        this._instructions.push(() => {
            this._arc(x, y, radius, startAngle, endAngle);
        })
    }

    public moveTo(x: number, y: number): void {
        this._instructions.push(() => {
            this._moveTo(x, y);
        })
    }

    public lineTo(x: number, y: number): void {
        this._instructions.push(() => {
            this._lineTo(x, y);
        })
    }

    public beginPath(): void {
        this._instructions.push(() => {
            this._context.beginPath();
        })
    }

    public stroke(): void {
        this._instructions.push(() => {
            this._context.stroke();
        })
    }

    public fill(): void {
        this._instructions.push(() => {
            this._context.fill();
        })
    }

    public clear(): void {
        this._instructions = [];
    }

    private _arc(x: number, y: number, radius: number, startAngle: number, endAngle: number): void {
        let { x: normalisedX, y: normalisedY } = this._normalise({ x, y });

        this._context.arc(normalisedX, normalisedY, radius, startAngle, endAngle);
    }

    private _moveTo(x: number, y: number): void {
        let { x: normalisedX, y: normalisedY } = this._normalise({ x, y });

        this._context.moveTo(normalisedX, normalisedY);
    }

    private _lineTo(x: number, y: number): void {
        let { x: normalisedX, y: normalisedY } = this._normalise({ x, y });

        this._context.lineTo(normalisedX, normalisedY);
    }

    private _clear(): void {
        this._context.clearRect(0, 0, this._width, this._height);
    }

    private _normalise({ x, y }: { x: number, y: number }): { x: number, y: number } {
        const scaleFactor = Math.min(this._width, this._height);

        if (this._width > this._height) {
            return {
                x: (x * scaleFactor) + ((this._width - scaleFactor) / 2),
                y: (1 - y) * scaleFactor
            }
        }

        return {
            x: x * scaleFactor,
            y: (1 - y) * scaleFactor + ((this._height - scaleFactor) / 2)
        }
    }
}
