import { BodyInterface } from '../interfaces/body.interface.js';
import { VectorInterface } from '../interfaces/vector.interface';
import { Vector } from './vector.js';

export class FixedBody implements BodyInterface {
    public position: VectorInterface;
    public momentum: VectorInterface;
    public projectedPosition: VectorInterface;
    public mass: number;
    public radius: number;
    public elasticity: number;
    public isFixed: boolean = true;

    constructor(position: VectorInterface, radius: number, mass: number = 0, elasticity: number = 1) {
        this.position = position;
        this.radius = radius;
        this.mass = mass;
        this.elasticity = elasticity;
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
