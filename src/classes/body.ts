import { Vector } from './vector.js';

export class Body {
    public position: Vector;
    public projectedPosition: Vector;
    public velocity: Vector;
    public force: Array<Vector>;
    public mass: number;
    public momentum: Vector;
    public radius: number;

    constructor(position: Vector, velocity: Vector, mass: number, radius: number) {
        this.position = position;
        this.velocity = velocity;
        this.mass = mass;
        this.force = [];
        this.momentum = Vector.multiply(velocity, mass);
        this.projectedPosition = Vector.add(position, velocity);
        this.radius = radius;
    }

    public tick(): void {
        const acceleration: Vector = this.force.reduce((acceleration: Vector, force: Vector) => {
            return Vector.add(acceleration, Vector.multiply(force, 1 / this.mass));
        }, new Vector(0, 0));

        this.velocity = Vector.add(this.velocity, acceleration);
        this.position = Vector.add(this.position, this.velocity);
        this.momentum = Vector.multiply(this.velocity, this.mass);
        this.projectedPosition = Vector.add(this.position, this.velocity);
        this.force = [];
    }
}
