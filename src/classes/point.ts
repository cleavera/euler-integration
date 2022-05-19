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

    public tick(friction: number, bounce: number, gravity: number): void {
        let vx = (this.x - this.oldX) * friction,
            vy = (this.y - this.oldY) * friction;

        this.oldX = this.x;
        this.oldY = this.y;
        this.x += vx;
        this.y += vy;

        this.y -= gravity;

        if(this.x > 1) {
            this.x = 1;
            this.oldX = this.x + vx * bounce;
        } else if(this.x < 0) {
            this.x = 0;
            this.oldX = this.x + vx * bounce;
        }

        if(this.y > 1) {
            this.y = 1;
            this.oldY = this.y + vy * bounce;
        } else if(this.y < 0) {
            this.y = 0;
            this.oldY = this.y + vy * bounce;
        }
    }
}