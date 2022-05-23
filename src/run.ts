import { Canvas } from './classes/canvas.js';
import { Body } from './classes/body.js';
import { FixedBody } from './classes/fixed-body.js';
import { Vector } from './classes/vector.js';

const canvas: Canvas = new Canvas(document.getElementById('canvas') as HTMLCanvasElement);
const friction = -0.01;
const gravity = Vector.FromCartesian(0, -0.004);
const bounce = 0.99;

let bodies = [
    new Body(Vector.FromCartesian(0.1, 0.1), Vector.FromCartesian(0.005, 0.05), 4, 0.01),
    new Body(Vector.FromCartesian(0.9, 0.1), Vector.FromCartesian(-0.005, 0.05), 4, 0.01),
    new Body(Vector.FromCartesian(0.6, 0.1), Vector.FromCartesian(0.005, 0.05), 4, 0.01),
    new Body(Vector.FromCartesian(0.4, 0.1), Vector.FromCartesian(-0.005, 0.05), 4, 0.01),
    new Body(Vector.FromCartesian(0.5, 0.9), Vector.FromCartesian(0, 0), 4, 0.01),
    new FixedBody(Vector.FromCartesian(-99.99, 0.5), 100),
    new FixedBody(Vector.FromCartesian(0.5, -99.99), 100),
    new FixedBody(Vector.FromCartesian(100.99, 0.5), 100),
    new FixedBody(Vector.FromCartesian(0.5, 100.99), 100),
    new FixedBody(Vector.FromCartesian(Math.random(), Math.random()), 0.01),
    new FixedBody(Vector.FromCartesian(Math.random(), Math.random()), 0.01),
    new FixedBody(Vector.FromCartesian(Math.random(), Math.random()), 0.01),
    new FixedBody(Vector.FromCartesian(Math.random(), Math.random()), 0.01),
    new FixedBody(Vector.FromCartesian(Math.random(), Math.random()), 0.01),
    new FixedBody(Vector.FromCartesian(Math.random(), Math.random()), 0.01),
];

update();

function update() {
    canvas.clear();
    canvas.drawFrame();
    updatePoints();
    renderPoints();
    requestAnimationFrame(update);
}

function updatePoints() {
    for(let i = 0; i < bodies.length; i++) {
        const body = bodies[i];

        body.applyForce(gravity);
        body.applyForce(Vector.multiply(body.momentum, friction))

        for (let j = 0; j < bodies.length; j++) {
            if (body === bodies[j]) {
                continue;
            }

            const resultant = Vector.subtract(body.projectedPosition, bodies[j].position);

            if (resultant.magnitude < (body.radius + bodies[j].radius)) {
                body.applyForce(Vector.multiply(Vector.invert(Vector.componentInDirectionOfVector(body.momentum, resultant)), 2));
                body.updatePosition(Vector.add(bodies[j].position, Vector.FromPolar(bodies[j].radius + body.radius, resultant.angle)));
            }
        }

        body.tick();
    }
}

function renderPoints() {
    for(let i = 0; i < bodies.length; i++) {
        let p = bodies[i];
        canvas.beginPath();
        canvas.circle(p.position.x, p.position.y, p.radius);
        canvas.fill();
    }

    canvas.redraw();
}

canvas.redraw();
