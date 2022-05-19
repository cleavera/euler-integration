import { Canvas } from './classes/canvas.js';
import { Body } from './classes/body.js';
import { Vector } from './classes/vector.js';

const canvas: Canvas = new Canvas(document.getElementById('canvas') as HTMLCanvasElement);
const friction = -0.01;
const gravity = new Vector(0, -0.004);
const bounce = 0.95;
const reflectionMultiplier = -2 * bounce;

let bodies = [
    new Body(new Vector(0.1, 0.1), new Vector(0.005, 0.05), 4),
    new Body(new Vector(0.9, 0.1), new Vector(-0.005, 0.05), 4),
    new Body(new Vector(0.6, 0.1), new Vector(0.005, 0.05), 4),
    new Body(new Vector(0.4, 0.1), new Vector(-0.005, 0.05), 4),
    new Body(new Vector(0.5, 0.9), new Vector(0, 0), 4),

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

        if (body.projectedPosition.x > 1) {
            body.force.push(new Vector(body.momentum.x * reflectionMultiplier, 0));
            body.position = new Vector(body.projectedPosition.x - (1 - body.position.x), body.position.y)
        }

        if (body.projectedPosition.x < 0) {
            body.force.push(new Vector(body.momentum.x * reflectionMultiplier, 0));
            body.position = new Vector(body.projectedPosition.x - body.position.x, body.position.y)
        }

        if (body.projectedPosition.y < 0) {
            body.force.push(new Vector(0, body.momentum.y * reflectionMultiplier));
            body.position = new Vector(body.position.x, body.projectedPosition.y - body.position.y)
        }

        if (body.projectedPosition.y > 1) {
            body.force.push(new Vector(0, body.momentum.y * reflectionMultiplier));
            body.position = new Vector(body.position.x, body.projectedPosition.y - (1 - body.position.y))
        }

        body.tick();
    }
}

function renderPoints() {
    for(let i = 0; i < bodies.length; i++) {
        let p = bodies[i];
        canvas.beginPath();
        canvas.arc(p.position.x, p.position.y, 5, 0, Math.PI * 2);
        canvas.fill();
    }

    canvas.redraw();
}

canvas.redraw();
