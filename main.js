import { Canvas } from './modules/Canvas.js';

window.onload = () => {
   const canvas = new Canvas();
   canvas.createCanvas();

   const animateButton = document.querySelector('.animate-button');

   animateButton.addEventListener('click', () => canvas.drawAnimation());
}