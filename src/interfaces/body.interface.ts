import { VectorInterface } from './vector.interface.js';

export interface BodyInterface {
    position: VectorInterface;
    momentum: VectorInterface;
    projectedPosition: VectorInterface;
    mass: number;
    radius: number;
    elasticity: number;
    isFixed: boolean;

    applyForce(_force: VectorInterface): void;

    updatePosition(_position: VectorInterface): void;

    tick(): void;
}