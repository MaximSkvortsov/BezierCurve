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

        document.body.appendChild(this.canvas);

        window.addEventListener('resize', () => this.setCanvasSize());
    }

    setCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setClickHandler() {
        this.canvas.addEventListener('click', (event) => {
            const pointColor = '#e6b217';

            this.createPoint(event.pageX, event.pageY, pointColor);

            this.rerender();
        });
    }

    rerender() {
        this.clearCanvas();
        this.drawPoints();
        this.drawLine();
        this.drawBezierCurve();
    }

    drawPoints() {
        this.points.forEach((el) => {
            document.body.appendChild(el.element);
        });
    }

    createPoint(x, y, color) {
        const pointSize = 10;

        const point = new Point(x - 5, y - 5, pointSize, color);

        this.points.push(point);
    }

    drawLine() {
        if (this.points.length < 2) {
            return;
        }

        const startPoint = this.points[0];

        this.context.beginPath();
        this.context.moveTo(startPoint.x + 5, startPoint.y + 5);

        this.points.forEach((el, index) => {
            if (index === 0) {
                return;
            }

            this.context.lineTo(el.x + 5, el.y + 5);
            this.context.lineWidth = 2;
            this.context.strokeStyle = '#e6b217';
            this.context.stroke();
        })

        this.context.closePath();
    }

    drawBezierCurve() {
        if(this.points.length === 1) {
            return;
        }

        for (let t = 0; t < 1; t += 0.01) {
            const coorArray = this.points.map((el) => ({ x: el.x, y: el.y }));

            this.drawCurvesPoint(coorArray, t)
        }
    }

    drawCurvesPoint(points, t) {
        if (points.length === 1) {
            const point = points[0];

            this.context.beginPath();
            this.context.arc(point.x, point.y, 2, 0, 2 * Math.PI);
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

class Point {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.element = document.createElement('div');

        this.element.style.backgroundColor = color;
        this.element.classList.add('point');
        this.element.style.width = `${size}px`;
        this.element.style.height = `${size}px`;

        this.setCoordinates();
    }

    setCoordinates() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }
}

window.onload = () => new Canvas().createCanvas();

