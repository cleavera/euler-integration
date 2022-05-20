import { AngleInterface } from './angle.interface';

export interface VectorInterface {
    readonly x: number;
    readonly y: number;
    readonly magnitude: number;
    readonly angle: AngleInterface;
}
