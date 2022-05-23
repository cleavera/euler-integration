import { BodyInterface } from '../interfaces/body.interface.js';
import { VectorInterface } from '../interfaces/vector.interface';
import { Vector } from './vector.js';

export class Body implements BodyInterface {
    public position: VectorInterface;
    public projectedPosition: VectorInterface;
    public velocity: VectorInterface;
    public mass: number;
    public momentum: VectorInterface;
    public radius: number;
    public elasticity: number;
    public isFixed: boolean = false;

    private _force: Array<VectorInterface>;

    constructor(position: VectorInterface, velocity: VectorInterface, mass: number, radius: number, elasticity: number = 1) {
        this.position = position;
        this.velocity = velocity;
        this.mass = mass;
        this.elasticity = elasticity;
        this._force = [];
        this.momentum = Vector.multiply(velocity, mass);
        this.projectedPosition = Vector.add(position, velocity);
        this.radius = radius;
    }

    public applyForce(force: VectorInterface): void {
        this._force.push(force);
    }

    public updatePosition(position: VectorInterface): void {
        this.position = position;
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
