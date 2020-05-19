import { config } from '../config.js';

class Point {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.element = document.createElement('div');

        this.element.style.backgroundColor = color;
        this.element.classList.add('point');
        this.element.style.width = `${size}px`;
        this.element.style.height = `${size}px`;
        this.element.draggable = true;

        this.setCoordinates();
        this.setDragHandlers();
    }

    setCoordinates() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    updateCoordinates(newX, newY) {
        this.x = newX;
        this.y = newY;

        this.setCoordinates();
    }

    setDragHandlers() {
        this.element.addEventListener('drag', (event) => {
            event.stopPropagation();
            this.updateCoordinates(event.clientX - config.pointCoorOffset, event.clientY - config.pointCoorOffset);
        });

        this.element.addEventListener('dragend', (event) => {
            event.stopPropagation();
            this.updateCoordinates(event.clientX - config.pointCoorOffset, event.clientY - config.pointCoorOffset);
        });
    }
}

export { Point };