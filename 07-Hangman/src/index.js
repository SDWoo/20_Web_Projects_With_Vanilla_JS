import App from './App.js';
const app = new App(document.querySelector('.App'));
window.addEventListener('keydown', app.handleKeyDown);
