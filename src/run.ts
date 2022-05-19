import { Canvas } from './classes/canvas.js';
import { Point } from './classes/point.js';

const canvas: Canvas = new Canvas(document.getElementById('canvas') as HTMLCanvasElement);
const friction = 0.99;
const gravity = 0.001;
const bounce = 0.5;

let points = [
    new Point(0.1, 0.1, 0.05, 0.05),
    new Point(0.9, 0.1, 0.95, 0.05),
    new Point(0.6, 0.1, 0.55, 0.05),
    new Point(0.4, 0.1, 0.45, 0.05)
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
    for(let i = 0; i < points.length; i++) {
        let p = points[i];

        p.tick(friction, bounce, gravity);
    }
}

function renderPoints() {
    for(let i = 0; i < points.length; i++) {
        let p = points[i];
        canvas.beginPath();
        canvas.arc(p.x, p.y, 5, 0, Math.PI * 2);
        canvas.fill();
    }

    canvas.redraw();
}

canvas.redraw();
