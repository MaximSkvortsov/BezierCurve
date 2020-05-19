import { Point } from './Point.js';
import { config } from '../config.js';

class Canvas {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.points = [];
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        this.setCanvasSize();
        this.setClickHandler();
        this.setDropHandler();

        document.body.appendChild(this.canvas);

        window.addEventListener('resize', () => this.setCanvasSize());
    }

    setCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setClickHandler() {
        this.canvas.addEventListener('click', (event) => {
            this.createPoint(event.pageX, event.pageY, config.supportColor);

            this.rerender();
        });
    }

    setDropHandler() {
        document.body.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        document.body.addEventListener('drop', () => {
            this.rerender();
        });
    }

    rerender() {
        this.clearCanvas();
        this.drawPoints();
        this.drawLine(this.points, config.supportColor);
        this.drawBezierCurve();
    }

    drawPoints() {
        this.points.forEach((el) => {
            document.body.appendChild(el.element);
        });
    }

    createPoint(x, y, color) {
        const point = new Point(x - config.pointCoorOffset, y - config.pointCoorOffset, config.pointSize, color);

        this.points.push(point);
    }

    drawLine(points, color) {
        if (points.length < 2) {
            return;
        }

        const startPoint = this.points[0];

        this.context.beginPath();
        this.context.moveTo(startPoint.x + config.pointCoorOffset, startPoint.y + config.pointCoorOffset);

        points.forEach((el, index) => {
            if (index === 0) {
                return;
            }

            this.context.lineTo(el.x + config.pointCoorOffset, el.y + config.pointCoorOffset);
            this.context.lineWidth = config.supportLineWidth;
            this.context.strokeStyle = color;
            this.context.stroke();
        })

        this.context.closePath();
    }

    drawBezierCurve() {
        if(this.points.length === 1) {
            return;
        }

        for (let t = 0; t < 1; t += config.tStep) {
            const coorArray = this.points.map((el) => ({ x: el.x, y: el.y }));

            this.drawCurvesPoint(coorArray, t)
        }
    }

    drawCurvesPoint(points, t) {
        if (points.length === 1) {
            const point = points[0];

            this.context.beginPath();
            this.context.arc(point.x + config.pointCoorOffset, point.y + config.pointCoorOffset, config.curvesPointRadius, 0, 2 * Math.PI);
            this.context.strokeStyle = config.curvesColor;
            this.context.stroke();
            this.context.closePath();

            return;
        }

        const newPoints = [];

        points.forEach((el, index, array) => {
            if (index === 0) {
                return;
            }

            const prevEl = array[index - 1];

            const d = this.getDistance(prevEl, el);

            const newPoint = { x: prevEl.x + (d.dx * t), y: prevEl.y + (d.dy * t) };
            newPoints.push(newPoint);
        })

        this.drawCurvesPoint(newPoints, t);
    }

    getDistance(pointFrom, pointTo) {
        const dx = pointTo.x - pointFrom.x;
        const dy = pointTo.y - pointFrom.y;

        return { dx, dy };
    }

    clearCanvas() {
        this.context.fillStyle = 'rgb(255, 255, 255)';
        this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
}

export { Canvas };