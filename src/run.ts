import { Body } from './classes/body.js';
import { Canvas } from './classes/canvas.js';
import { Collision } from './classes/collision.js';
import { FixedBody } from './classes/fixed-body.js';
import { Vector } from './classes/vector.js';

const canvas: Canvas = new Canvas(document.getElementById('canvas') as HTMLCanvasElement);
const gravity = Vector.FromCartesian(0, -0.004);
let limit: number = 10000;

let bodies = [
    new Body(Vector.FromCartesian(0.1, 0.1), Vector.FromCartesian(0.001, 0.01), 4, 0.01, 0.5),
    new Body(Vector.FromCartesian(0.9, 0.1), Vector.FromCartesian(-0.001, 0.01), 4, 0.01, 0.5),
    new Body(Vector.FromCartesian(0.6, 0.1), Vector.FromCartesian(0.001, 0.01), 4, 0.01, 0.5),
    new Body(Vector.FromCartesian(0.4, 0.1), Vector.FromCartesian(-0.001, 0.01), 4, 0.01, 0.5),
    new Body(Vector.FromCartesian(0.5, 0.9), Vector.FromCartesian(0, 0), 4, 0.01, 0.5),
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
    new Body(Vector.FromCartesian(0.4, 0.495), Vector.FromCartesian(0.001, 0.001), 4, 0.01, 1),
    new Body(Vector.FromCartesian(0.5, 0.5), Vector.FromCartesian(0, 0), 4, 0.01, 1),
    new Body(Vector.FromCartesian(0.6, 0.505), Vector.FromCartesian(-0.0005, 0), 4, 0.01, 1),
];

update();

function update() {
    canvas.clear();
    canvas.drawFrame();
    updatePoints();
    renderPoints();

    if (--limit > 0) {
        requestAnimationFrame(update);
    }
}

function updatePoints() {
    const collisions: Array<Collision> = Collision.detect(bodies);

    collisions.forEach((collision: Collision) => {
        collision.resolve();
    });

    for (let body of bodies) {
        body.tick();
    }
}

function renderPoints() {
    for (let i = 0; i < bodies.length; i++) {
        let p = bodies[i];
        canvas.beginPath();
        canvas.circle(p.position.x, p.position.y, p.radius);
        canvas.fill();
    }

    canvas.redraw();
}

canvas.redraw();
