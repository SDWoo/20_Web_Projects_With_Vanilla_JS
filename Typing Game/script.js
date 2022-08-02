// 기능 목록
// 난이도 정하기 (Easy, Medium, Hard)
// 커서 바로 input으로 가서 칠 수 있게 하기
// 난이도에 따른 타임과 스코어
// 단어 무작위로 띄워주기
// 단어 입력시 문제 바꾸고 맞으면 score + 1
// 시간 다 지나면 Time run out 페이지 띄워주기

const word = document.querySelector('#word');
const input = document.querySelector('#text');
const timeEl = document.querySelector('#time');
const scoreEl = document.querySelector('#score');

const settingBtn = document.querySelector('#setting-btn');
const settings = document.querySelector('#settings');
const settingsForm = document.querySelector('#setting-form');
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

let initWord = '';
let score = 0;
let time = 0;

function addWordToDOM() {
  initWord = words[Math.floor(Math.random() * words.length)];
  word.innerText = initWord;
}

function updateScore() {
  score++;
  scoreEl.innerText = score;
}

function init() {
  score = 0;
  scoreEl.innerHTML = score;
  time = 0;
  addWordToDOM();
}

init();

input.addEventListener('input', (e) => {
  const insertedText = e.target.value;

  if (insertedText === initWord) {
    addWordToDOM();
    updateScore();
    e.target.value = '';
  }
});
