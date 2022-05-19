import { Canvas } from './classes/canvas.js';
import { Body } from './classes/body.js';
import { FixedBody } from './classes/fixed-body.js';
import { Vector } from './classes/vector.js';

const canvas: Canvas = new Canvas(document.getElementById('canvas') as HTMLCanvasElement);
const friction = -0.01;
const gravity = new Vector(0, -0.004);
const bounce = 0.99;
const reflectionMultiplier = -2 * bounce;

let bodies = [
    new Body(new Vector(0.1, 0.1), new Vector(0.005, 0.05), 4, 0.01),
    new Body(new Vector(0.9, 0.1), new Vector(-0.005, 0.05), 4, 0.01),
    new Body(new Vector(0.6, 0.1), new Vector(0.005, 0.05), 4, 0.01),
    new Body(new Vector(0.4, 0.1), new Vector(-0.005, 0.05), 4, 0.01),
    new Body(new Vector(0.5, 0.9), new Vector(0, 0), 4, 0.01),
];

let fixed = [
    new FixedBody(new Vector(-99.99, 0.5), 100),
    new FixedBody(new Vector(0.5, -99.99), 100),
    new FixedBody(new Vector(100.99, 0.5), 100),
    new FixedBody(new Vector(0.5, 100.99), 100)
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
            const resultant = Vector.subtract(body.position, fixed[j].position);

            if (resultant.magnitude < (body.radius + fixed[j].radius)) {

            }
        }

        if ((body.projectedPosition.x + body.radius) > 1) {
            body.force.push(new Vector(body.momentum.x * reflectionMultiplier, 0));
            body.position = new Vector((body.projectedPosition.x - (1 - body.position.x)) + body.radius, body.position.y);
        }

        if ((body.projectedPosition.x - body.radius) < 0) {
            body.force.push(new Vector(body.momentum.x * reflectionMultiplier, 0));
            body.position = new Vector((body.projectedPosition.x - body.position.x) + body.radius, body.position.y);
        }

        if ((body.projectedPosition.y - body.radius) < 0) {
            body.force.push(new Vector(0, body.momentum.y * reflectionMultiplier));
            body.position = new Vector(body.position.x, (body.projectedPosition.y - body.position.y) + body.radius);
        }

        if ((body.projectedPosition.y + body.radius) > 1) {
            body.force.push(new Vector(0, body.momentum.y * reflectionMultiplier));
            body.position = new Vector(body.position.x, (body.projectedPosition.y - (1 - body.position.y)) + body.radius);
        }

        body.tick();
    }
}

function renderPoints() {
    for(let i = 0; i < bodies.length; i++) {
        let p = bodies[i];
        canvas.beginPath();
        canvas.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2);
        canvas.fill();
    }

    for(let i = 0; i < fixed.length; i++) {
        let p = fixed[i];
        canvas.beginPath();
        canvas.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2);
        canvas.fill();
    }

    canvas.redraw();
}

canvas.redraw();
