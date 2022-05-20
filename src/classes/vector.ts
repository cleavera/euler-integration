import { AngleInterface } from '../interfaces/angle.interface';
import { VectorInterface } from '../interfaces/vector.interface';
import { Angle } from './angle.js';

export class Vector {
    public static FromCartesian(x: number, y: number): VectorInterface {
        return {
            x,
            y,
            magnitude: Math.sqrt((x ** 2) + (y ** 2)),
            angle: Angle.FromCartesianDisplacement(x, y)
        };
    }

    public static FromPolar(magnitude: number, angle: AngleInterface): VectorInterface {
        return {
            x: Angle.cosine(angle) * magnitude,
            y: Angle.sine(angle) * magnitude,
            magnitude,
            angle
        };
    }

    public static add(v1: VectorInterface, v2: VectorInterface): VectorInterface {
        return Vector.FromCartesian(this._round(v1.x + v2.x), this._round(v1.y + v2.y));
    }

    public static subtract(v1: VectorInterface, v2: VectorInterface): VectorInterface {
        return Vector.FromCartesian(this._round(v1.x - v2.x), this._round(v1.y - v2.y));
    }

    public static multiply(vector: VectorInterface, scalar: number): VectorInterface {
        return Vector.FromCartesian(this._round(vector.x * scalar), this._round(vector.y * scalar));
    }

    public static dotProduct(v1: VectorInterface, v2: VectorInterface): number {
        return (v1.x * v2.x) + (v1.y * v2.y);
    }

    public static componentInDirectionOfVector(vector: VectorInterface, direction: VectorInterface): VectorInterface {
        return this.FromPolar(this.dotProduct(vector, direction) / direction.magnitude, direction.angle);
    }

    public static invert(vector: VectorInterface): VectorInterface {
        return this.FromCartesian(vector.x * -1, vector.y* -1);
    }

    private static _round(n: number): number {
        return n;
    }
}