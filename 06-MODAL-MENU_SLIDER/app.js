const toggle = document.querySelector('#toggle');
const modal = document.querySelector('#modal');
const open = document.querySelector('#open');
const close = document.querySelector('#close');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
});

open.addEventListener('click', () => {
  modal.classList.add('show-modal');
});

close.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});

window.addEventListener('click', () => {
  e.target === modal ? modal.classList.remove('show-modal') : false;
});
