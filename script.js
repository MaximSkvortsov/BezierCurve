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
        })
    }

    drawPoints() {
        this.points.forEach((el) => {
            document.body.appendChild(el);
        });
    }

    createPoint(x, y, color) {
        const pointSize = 10;

        const point = new Point(x, y, pointSize, color).element;

        this.points.push(point);
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

