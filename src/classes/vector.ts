export class Vector {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static add(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    public static multiply(vector: Vector, scalar: number): Vector {
        return new Vector(vector.x * scalar, vector.y * scalar);
    }
}