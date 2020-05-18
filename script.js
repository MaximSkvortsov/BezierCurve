class Canvas {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.pointsCoordinates = [];
        this.ponts = [];
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
            this.pointsCoordinates.push(new pointsCoordinates(event.pageX, event.pageY));

            this.drawPoints();
        })
    }

    drawPoints() {
        this.pointsCoordinates.forEach((el) => {
            const point = this.createPoint(el.x, el.y, '#e6b217');

            document.body.appendChild(point);
        });
    }

    createPoint(x, y, color) {
        const pointSize = 10;

        const point = new Point(x, y, pointSize, color).element;

        this.ponts.push(point);

        return point;
    }
}

class pointsCoordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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

