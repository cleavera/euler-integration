import { BodyInterface } from '../interfaces/body.interface.js';
import { VectorInterface } from '../interfaces/vector.interface.js';
import { Vector } from './vector.js';

export class Collision {
    private body1: BodyInterface;
    private body2: BodyInterface;
    private collisionPoint: VectorInterface;

    constructor(body1: BodyInterface, body2: BodyInterface, collisionPoint: VectorInterface) {
        this.body1 = body1;
        this.body2 = body2;
        this.collisionPoint = collisionPoint;
    }

    public resolve(): void {
        const body1ImpactPoint: VectorInterface = Vector.subtract(this.collisionPoint, this.body1.position);
        const body2ImpactPoint: VectorInterface = Vector.subtract(this.collisionPoint, this.body2.position);
        const totalElasticity: number = this.body1.elasticity * this.body2.elasticity;

        let impactForce: VectorInterface = Vector.multiply(Vector.subtract(
            Vector.componentInDirectionOfVector(this.body1.momentum, body1ImpactPoint),
            Vector.componentInDirectionOfVector(this.body2.momentum, body2ImpactPoint)
        ), totalElasticity);

        if (this.body2.isFixed) {
            impactForce = Vector.multiply(Vector.componentInDirectionOfVector(this.body1.momentum, body1ImpactPoint), 1 + totalElasticity);
        } else if (this.body1.isFixed) {
            impactForce = Vector.multiply(Vector.componentInDirectionOfVector(this.body2.momentum, body2ImpactPoint), -1 - totalElasticity);
        }

        this.body1.applyForce(Vector.invert(impactForce));
        this.body2.applyForce(impactForce);

        this.body1.updatePosition(Vector.subtract(this.collisionPoint, Vector.FromPolar(this.body1.radius, body1ImpactPoint.angle)));
        this.body2.updatePosition(Vector.subtract(this.collisionPoint, Vector.FromPolar(this.body2.radius, body2ImpactPoint.angle)));
    }

    public static detect(bodies: Array<BodyInterface>): Array<Collision> {
        const collisions: Array<Collision> = [];

        for (let x = 0; x < bodies.length; x++) {
            for (let y = x + 1; y < bodies.length; y++) {
                if (bodies[x].isFixed && bodies[y].isFixed) {
                    continue;
                }

                const collisionPoint: VectorInterface | null = this._getCollisionPoint(bodies[x], bodies[y]);

                if (collisionPoint !== null) {
                    collisions.push(new Collision(bodies[x], bodies[y], collisionPoint));
                }
            }
        }

        return collisions;
    }

    private static _getCollisionPoint(body1: BodyInterface, body2: BodyInterface): VectorInterface | null {
        const body1Movement: VectorInterface = Vector.subtract(body1.projectedPosition, body1.position);
        const body2Movement: VectorInterface = Vector.subtract(body2.projectedPosition, body2.position);
        const collisionDistance: number = (body1.radius + body2.radius);
        let lastResultant: VectorInterface = Vector.subtract(body1.position, body2.position);

        for (let x = 0; x < 10; x++) {
            const body1Position: VectorInterface = Vector.add(body1.position, Vector.FromPolar(body1Movement.magnitude * (x / 10), body1Movement.angle));
            const body2Position: VectorInterface = Vector.add(body2.position, Vector.FromPolar(body2Movement.magnitude * (x / 10), body2Movement.angle));
            const resultant: VectorInterface = Vector.subtract(body1Position, body2Position);

            if (resultant.magnitude < collisionDistance) {
                return Vector.add(body2.position, Vector.FromPolar(body2.radius, resultant.angle));
            }

            lastResultant = resultant;
        }

        return null;
    }
}
