import { VectorInterface } from '../interfaces/vector.interface';
import { Vector } from './vector.js';

export class Body {
    public position: VectorInterface;
    public projectedPosition: VectorInterface;
    public velocity: VectorInterface;
    public mass: number;
    public momentum: VectorInterface;
    public radius: number;

    private _force: Array<VectorInterface>;

    constructor(position: VectorInterface, velocity: VectorInterface, mass: number, radius: number) {
        this.position = position;
        this.velocity = velocity;
        this.mass = mass;
        this._force = [];
        this.momentum = Vector.multiply(velocity, mass);
        this.projectedPosition = Vector.add(position, velocity);
        this.radius = radius;
    }

    public applyForce(force: VectorInterface): void {
        this._force.push(force);
    }

    public tick(): void {
        const acceleration: VectorInterface = this._force.reduce((acceleration: VectorInterface, force: VectorInterface) => {
            return Vector.add(acceleration, Vector.multiply(force, 1 / this.mass));
        }, Vector.FromCartesian(0, 0));

        this.velocity = Vector.add(this.velocity, acceleration);
        this.position = Vector.add(this.position, this.velocity);
        this.momentum = Vector.multiply(this.velocity, this.mass);
        this.projectedPosition = Vector.add(this.position, this.velocity);
        this._force = [];
    }
}
