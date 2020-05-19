import { Canvas } from './modules/Canvas.js';

window.onload = () => {
    const canvas = new Canvas();
    canvas.createCanvas();

    const startAnimateButton = document.querySelector('.start');

    startAnimateButton.addEventListener('click', () => canvas.drawAnimation());

    const stopAnimateButton = document.querySelector('.stop');

    stopAnimateButton.addEventListener('click', () => canvas.stopAnimation());

    const resetButtom = document.querySelector('.reset');

    resetButtom.addEventListener('click', () => {
        canvas.points.forEach((el) => document.body.removeChild(el.element));

        canvas.reset();
    });
}