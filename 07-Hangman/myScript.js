// 기능 목록

// step 1 문제 만들기
//- [o] - 문제가 결정되면 그 문제 수 대로 word에 새로운 Elements 추가

// step 2 정답 입력받기
// 1. 알파벳을 입력한다. [o]
// 2. 알파벳이 맞으면 answer container에 있는 해당 문자들이 보여진다. [o]
// 3. 알파벳이 틀리면 wrong answer container에 wrong과 해당 알파벳이 들어가 보여진다. [o]
// 4. 틀리면 fiqure parts가 하나씩 화면에 보이게 된다. [o]]
// 5. 중복된 값이 들어오면 notification 보여주기 [o]

// step 3 게임 끝내기
// 1. 단어와 correctLetters가 같으면 끝 [o]
// 2. figure parts.length 와 wrongLetters.length가 같으면 끝 [o]
// 3. 끝나면 화면에 final message 보여주기 [o]
// 4. 끝나고 보여진 popup 창에서 버튼 누르면 모두 리셋하고 다시 시작하기 [o]

const wrongAnswerEl = document.querySelector('#wrong-letter');
const correctLetterEl = document.querySelector('.enter-answer-container');
const figureParts = document.querySelectorAll('.figure-parts');
const finalMessage = document.querySelector('#final-message');
const notificationEl = document.querySelector('#notification-container');
const popup = document.querySelector('#popup-container');
const playBtn = document.querySelector('#play-button');

const words = ['hangman', 'focus', 'relationship', 'starbucks'];
let answer = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

const init = () => {
  correctLetterEl.innerHTML = `
    ${answer
      .split('')
      .map(
        (letter) => `
    <span class="letter">${
      correctLetters.includes(letter) ? letter : ' '
    }</span>
    `
      )
      .join('')}`;

  const innerWord = correctLetterEl.innerText.replace(/\n/g, '');

  if (innerWord === answer) {
    finalMessage.innerText = 'Congratulations! You won! 😃';
    popup.style.display = 'flex';
  }
};

const updateWrongLettersEl = () => {
  wrongAnswerEl.innerHTML = `${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;

  figureParts.forEach((part, index) => {
    const error = wrongLetters.length;

    index < error
      ? (part.style.display = 'block')
      : (part.style.display = 'none');
  });

  endGame();
};

const endGame = () => {
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😕';
    popup.style.display = 'flex';
  }
};

const showNotification = () => {
  notificationEl.classList.add('show');

  setTimeout(() => {
    notificationEl.classList.remove('show');
  }, 2000);
};

const arrayIncludes = (array, letter, callback) => {
  if (array.includes(letter)) {
    showNotification();
    return;
  }

  array.push(letter);
  callback();
};

const reset = () => {
  answer = words[Math.floor(Math.random() * words.length)];
  correctLetters.splice(0);
  wrongLetters.splice(0);

  init();
  updateWrongLettersEl();
  popup.style.display = 'none';
};

window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    answer.includes(letter)
      ? arrayIncludes(correctLetters, letter, init)
      : arrayIncludes(wrongLetters, letter, updateWrongLettersEl);
  }
});

playBtn.addEventListener('click', reset);

init();
