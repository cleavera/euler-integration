import { Canvas } from './classes/canvas.js';
import { Point } from './classes/point.js';

const canvas: Canvas = new Canvas(document.getElementById('canvas') as HTMLCanvasElement);

let points = [
    new Point(0.1, 0.1, 0.05, 0.05),
    new Point(0.9, 0.1, 0.95, 0.05),
    new Point(0.6, 0.1, 0.55, 0.05),
    new Point(0.4, 0.1, 0.45, 0.05)
];

let gravity = 0.001;
let bounce = 0.5;
let friction = 0.99;

update();

function update() {
    canvas.clear();
    drawFrame();
    updatePoints();
    renderPoints();
    requestAnimationFrame(update);
}

function updatePoints() {
    for(let i = 0; i < points.length; i++) {
        let p = points[i],
            vx = (p.x - p.oldX) * friction,
            vy = (p.y - p.oldY) * friction;

        p.oldX = p.x;
        p.oldY = p.y;
        p.x += vx;
        p.y += vy;
        p.y -= gravity;

        if(p.x > 1) {
            p.x = 1;
            p.oldX = p.x + vx * bounce;
        }
        else if(p.x < 0) {
            p.x = 0;
            p.oldX = p.x + vx * bounce;
        }
        if(p.y > 1) {
            p.y = 1;
            p.oldY = p.y + vy * bounce;
        }
        else if(p.y < 0) {
            p.y = 0;
            p.oldY = p.y + vy * bounce;
        }
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

function drawFrame(): void {
    canvas.moveTo(0,0);
    canvas.lineTo(1, 0);
    canvas.lineTo(1, 1);
    canvas.lineTo(0, 1);
    canvas.lineTo(0, 0);
    canvas.stroke();
}

canvas.redraw();

let timeout: number | null = null;
let throttled: boolean = false;
let debounce: number = 16;

window.addEventListener('resize', () => {
    if (timeout !== null) {
        window.clearTimeout(timeout);
    }

    timeout = window.setTimeout(onResize, debounce);

    if (!throttled) {
        onResize();
        throttled = true;

        window.setTimeout(() => {
            throttled = false;
        }, debounce)
    }
});

function onResize(): void {
    canvas.onResize();
    canvas.redraw();
}