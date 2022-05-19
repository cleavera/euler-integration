export class Point {
    public x: number;
    public y: number;
    public oldX: number;
    public oldY: number;

    constructor(x: number, y: number, oldX: number, oldY: number) {
        this.x = x;
        this.y = y;
        this.oldX = oldX;
        this.oldY = oldY
    }
}