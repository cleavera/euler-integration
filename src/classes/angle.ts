import { AngleInterface } from '../interfaces/angle.interface';

export class Angle {
    public static FromTurns(turns: number): AngleInterface {
        return {
            turns: turns,
            degrees: turns * 360,
            radians: turns * (2 * Math.PI)
        };
    }
    public static FromRadians(radians: number): AngleInterface {
        return {
            turns: radians / (2 * Math.PI),
            degrees: (radians * 360) / (2 * Math.PI),
            radians
        };
    }

    public static FromCartesianDisplacement(x: number, y: number): AngleInterface {
        return this.FromRadians(Math.atan2(y, x));
    }

    public static sine(angle: AngleInterface): number {
        return Math.sin(angle.radians);
    }

    public static cosine(angle: AngleInterface): number {
        return Math.cos(angle.radians);
    }
}
