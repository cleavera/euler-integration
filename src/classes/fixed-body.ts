import { Vector } from './vector.js';

export class FixedBody {
    public position: Vector;
    public radius: number;

    constructor(position: Vector, radius: number) {
        this.position = position;
        this.radius = radius;
    }
}
