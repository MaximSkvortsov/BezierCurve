import { Canvas } from './modules/Canvas.js';

window.onload = () => {
    const canvas = new Canvas();
    canvas.createCanvas();

    const startAnimationButton = document.querySelector('.start');

    startAnimationButton.addEventListener('click', () => canvas.drawAnimation());

    const stopAnimationButton = document.querySelector('.stop');

    stopAnimationButton.addEventListener('click', () => canvas.stopAnimation());

    const resetButtom = document.querySelector('.reset');

    resetButtom.addEventListener('click', () => {
        canvas.points.forEach((el) => document.body.removeChild(el.element));

        canvas.stopAnimation();
        canvas.reset();
    });
}