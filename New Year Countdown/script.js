const days = document.querySelector('#days');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const countdown = document.querySelector('.time-container');
const year = document.querySelector('#year');
const loading = document.querySelector('#loading');

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);
year.innerText = newYearTime.getFullYear();

function updateCountdown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const day = Math.floor(diff / 1000 / 60 / 60 / 24);
  const hour = Math.floor(diff / 1000 / 60 / 60) % 24;
  const minute = Math.floor(diff / 1000 / 60) % 60;
  const second = Math.floor(diff / 1000) % 60;

  days.innerText = day;
  hours.innerText = String(hour).padStart(2, '0');
  minutes.innerText = String(minute).padStart(2, '0');
  seconds.innerText = String(second).padStart(2, '0');
}

setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 1000);

setInterval(updateCountdown, 1000);
