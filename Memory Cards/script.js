/* 
- 기능목록
- 1. 카드 추가 기능
- [] - add 버튼 누를 시, 카드만들 수있는 addContainer 띄워주기
- [] - addContainer에서 입력받은 querstion과 answer를 관리하기
- [] - 관리한 question과 answer를 DOM요소로 바꾸어 보여주기
*/
const cardContainer = document.querySelector('#card-container');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const clearBtn = document.querySelector('#clear-btn');
const currentEl = document.querySelector('#current');
const hideBtn = document.querySelector('#hide');
const questionEl = document.querySelector('#question');
const answerEl = document.querySelector('#answer');
const addCardBtn = document.querySelector('#add-card');
const addContainer = document.querySelector('#add-container');
const showBtn = document.querySelector('#show');

// current Card를 추적한다.
let currentActiveCard = 0;

// DOM cards를 저장
const cardsEl = [];

const cardsData = getCardData();
// Store card data (예시)
// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _',
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data',
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable',
//   },
// ];

// 모든 카드 만들기
function createAllcards() {
  cardsData.forEach((data, index) => createCards(data, index));
}

// 카드 하나씩 만들기 (for forEach)
function createCards(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
        <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
        <p>${data.answer}</p>
    </div>
</div>`;

  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  cardsEl.push(card);
  cardContainer.appendChild(card);
  updateCurrentText();
}

// 목차 다루기
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
}

// 로컬 스토리지에서 카드 데이터 받아오기
function getCardData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// 로컬 스토리지에 카드 데이터 저장하기
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

createAllcards();

//이벤트 리스너
// 이전 버튼 이벤트 리스너
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard -= 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// 다음 버튼 이벤트 리스너
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard += 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// add container 보여주기 / 숨기기
showBtn.addEventListener('click', () => addContainer.classList.add('show'));
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// 카드 추가하기
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question: question, answer: answer };
    console.log(newCard);
    createCards(newCard);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');
    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardContainer.innerHTML = '';
  window.location.reload();
});
