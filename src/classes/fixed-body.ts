import { VectorInterface } from '../interfaces/vector.interface';

export class FixedBody {
    public position: VectorInterface;
    public radius: number;

    constructor(position: VectorInterface, radius: number) {
        this.position = position;
        this.radius = radius;
    }
}
