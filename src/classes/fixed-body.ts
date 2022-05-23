import { VectorInterface } from '../interfaces/vector.interface';
import { Vector } from './vector.js';

export class FixedBody {
    public position: VectorInterface;
    public momentum: VectorInterface;
    public projectedPosition: VectorInterface;
    public mass: number;
    public radius: number;

    constructor(position: VectorInterface, radius: number, mass: number = 0) {
        this.position = position;
        this.radius = radius;
        this.mass = mass;
        this.momentum = Vector.FromCartesian(0, 0);
        this.projectedPosition = position;
    }

    public applyForce(_force: VectorInterface): void {
        return;
    }

    public updatePosition(_position: VectorInterface): void {
        return;
    }

    public tick(): void {
        return;
    }
}
