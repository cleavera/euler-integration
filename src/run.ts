import { Angle } from './classes/angle.js';
import { Canvas } from './classes/canvas.js';
import { Body } from './classes/body.js';
import { FixedBody } from './classes/fixed-body.js';
import { Vector } from './classes/vector.js';

const canvas: Canvas = new Canvas(document.getElementById('canvas') as HTMLCanvasElement);
const friction = -0.01;
const gravity = Vector.FromCartesian(0, -0.004);
const bounce = 0.99;
const reflectionMultiplier = -2 * bounce;

let bodies = [
    new Body(Vector.FromCartesian(0.1, 0.1), Vector.FromCartesian(0.005, 0.05), 4, 0.01),
    new Body(Vector.FromCartesian(0.9, 0.1), Vector.FromCartesian(-0.005, 0.05), 4, 0.01),
    new Body(Vector.FromCartesian(0.6, 0.1), Vector.FromCartesian(0.005, 0.05), 4, 0.01),
    new Body(Vector.FromCartesian(0.4, 0.1), Vector.FromCartesian(-0.005, 0.05), 4, 0.01),
    new Body(Vector.FromCartesian(0.5, 0.9), Vector.FromCartesian(0, 0), 4, 0.01),
];

let fixed = [
    new FixedBody(Vector.FromCartesian(-99.99, 0.5), 100),
    new FixedBody(Vector.FromCartesian(0.5, -99.99), 100),
    new FixedBody(Vector.FromCartesian(100.99, 0.5), 100),
    new FixedBody(Vector.FromCartesian(0.5, 100.99), 100)
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

        body.force.push(gravity);
        body.force.push(Vector.multiply(body.momentum, friction))

        for (let j = 0; j < fixed.length; j++) {
            const resultant = Vector.subtract(body.projectedPosition, fixed[j].position);

            if (resultant.magnitude < (body.radius + fixed[j].radius)) {
                body.force.push(Vector.multiply(Vector.invert(Vector.componentInDirectionOfVector(body.momentum, resultant)), 2));
                body.position = Vector.add(fixed[j].position, Vector.FromPolar(fixed[j].radius + body.radius, resultant.angle));
            }
        }

        body.tick();
    }
}

function renderPoints() {
    for(let i = 0; i < bodies.length; i++) {
        let p = bodies[i];
        canvas.beginPath();
        canvas.arc(p.position.x, p.position.y, p.radius, Angle.FromTurns(0), Angle.FromTurns(1));
        canvas.fill();
    }

    for(let i = 0; i < fixed.length; i++) {
        let p = fixed[i];
        canvas.beginPath();
        canvas.arc(p.position.x, p.position.y, p.radius, Angle.FromTurns(0), Angle.FromTurns(1));
        canvas.fill();
    }

    canvas.redraw();
}

canvas.redraw();
