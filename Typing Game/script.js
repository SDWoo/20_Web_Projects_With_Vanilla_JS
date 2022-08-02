const word = document.querySelector('#word');
const input = document.querySelector('#text');
const timeEl = document.querySelector('#time');
const scoreEl = document.querySelector('#score');

const settingBtn = document.querySelector('#setting-btn');
const settings = document.querySelector('#settings');
const settingsForm = document.querySelector('#settings-form');
const difficulty = document.querySelector('#difficulty');
const endGameContainer = document.querySelector('#end-game-container');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

// initial values
let initWord = '';
let score = 0;
let time = 10;
let initDifficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// 단어 DOM에 추가해 보여주기
function addWordToDOM() {
  initWord = words[Math.floor(Math.random() * words.length)];
  word.innerText = initWord;
}

// 1초 타임아웃 만들기
const timeInterval = setInterval(updateTime, 1000);

// 스코어 업데이트 하기
function updateScore() {
  score++;
  scoreEl.innerText = score;
}

// 화면 처음 진입하거나 새로고침시 리셋
function init() {
  difficulty.value = initDifficulty;
  score = 0;
  scoreEl.innerHTML = score;
  time = 10;
  timeEl.innerHTML = time + 's';
  addWordToDOM();
}

// 시간 DOM 업데이트
function updateTime() {
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
  time--;
  timeEl.innerHTML = time + 's';
}

// 게임 종료, Time run out 페이지 띄워주기
function gameOver() {
  endGameContainer.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Reload</button>`;

  endGameContainer.style.display = 'flex';
}

init();
input.focus(); // input 요소에 계속 포커스 되어있게 하기

// 단어 입력과 스코어
input.addEventListener('input', (e) => {
  const insertedText = e.target.value;

  if (insertedText === initWord) {
    addWordToDOM();
    updateScore();
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});

settingBtn.addEventListener('click', () => settings.classList.toggle('hide'));

settingsForm.addEventListener('change', (e) => {
  initDifficulty = e.target.value;
  localStorage.setItem('difficulty', initDifficulty);
});
