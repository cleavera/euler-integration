export class Vector {
    public readonly x: number;
    public readonly y: number;
    public readonly magnitude: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.magnitude = Math.sqrt((x ** 2) + (y ** 2));
    }

    public static add(v1: Vector, v2: Vector): Vector {
        return new Vector(this._round(v1.x + v2.x), this._round(v1.y + v2.y));
    }

    public static subtract(v1: Vector, v2: Vector): Vector {
        return new Vector(this._round(v1.x - v2.x), this._round(v1.y - v2.y));
    }

    public static multiply(vector: Vector, scalar: number): Vector {
        return new Vector(this._round(vector.x * scalar), this._round(vector.y * scalar));
    }

    private static _round(n: number): number {
        return n;
    }
}