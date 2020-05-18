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

            this.drawPoints();
            this.drawLine();
        })
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

        this.context.closePath
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

