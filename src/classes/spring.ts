import { BodyInterface } from '../interfaces/body.interface.js';
import { VectorInterface } from '../interfaces/vector.interface.js';
import { Vector } from './vector.js';

export class Spring {
    public start: BodyInterface;
    public end: BodyInterface;
    public length: number;
    public stiffness: number;
    public damping: number;

    constructor(start: BodyInterface, end: BodyInterface, length: number | null = null, stiffness: number = 1, damping: number = 0) {
        this.start = start;
        this.end = end;
        this.length = length ?? Vector.subtract(this.end.position, this.start.position).magnitude;
        this.stiffness = stiffness;
        this.damping = damping;
    }

    public restore(): void {
        const bodyDisplacement: VectorInterface = Vector.subtract(this.end.position, this.start.position);
        const springDeformation: VectorInterface = Vector.FromPolar(bodyDisplacement.magnitude - this.length, bodyDisplacement.angle);

        this.start.applyForce(Vector.multiply(springDeformation, this.stiffness));
        this.end.applyForce(Vector.invert(Vector.multiply(springDeformation, this.stiffness)));
    }
}
