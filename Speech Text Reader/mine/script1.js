/*
# 기능 목록

- 처음 기능
- [o] - image와 text받아와서 화면에 grid 구조로 띄워주기

- Text Box 기능
- [o] - Toggle Text Bar 버튼으로 .show toggle하기
- [o] - voice 받아와서 Text Bar의 select 태그에 option으로 넣기
- [] - voice가 정해지면 정해지면 해당 value를 message.voice에 넣기
- [] - Read Text 버튼을 누르면 textarea에 입력된 value를 message.text에 넣기
- [] - speechSynthesis.speak(message 객체)로 speak 하기

- 아이템 클릭 시
- [] - item 클릭하면 text를 받아와서 message객체의 text로 정하기
- [] - voice 정해지면 새로 생성해논 message 객체의 text로 정하기
- [] - speechSynthesis.speak(message 객체)로 speak 하기
*/
const main = document.querySelector('main');
const textbox = document.querySelector('#text-box');
const toggleBtn = document.querySelector('#toggle-btn');
const closeBtn = document.querySelector('#close-btn');
const voicesSelect = document.querySelector('#voices');
const readBtn = document.querySelector('#read');
const text = document.querySelector('#text');
const items = document.querySelector('.item');

const data = [
  {
    image: '../img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: '../img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: '../img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: '../img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: '../img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: '../img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: '../img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: '../img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: '../img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: '../img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: '../img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: '../img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

let voices = [];
message = new SpeechSynthesisUtterance();
// DOM 요소에 grid item 추가하기
function createGridItem(item) {
  const itemContainer = document.createElement('div');

  const { image, text } = item;
  itemContainer.classList.add('item');

  itemContainer.innerHTML = `
    <img src="${image}" alt="${text}"/>
    <p id="item-text">${text}</p>
    `;

  itemContainer.addEventListener('click', () => {
    setMessage(text);
    speakText();

    itemContainer.classList.add('active');
    setTimeout(() => itemContainer.classList.remove('active'), 800);
  });
  main.appendChild(itemContainer);
}

// TextBox 보여지게 하기
function showTextBox() {
  textbox.classList.toggle('show');
}

// Voice 추가하기
function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// 재생할 Voice 설정하기
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

function setMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}
// 이벤트 리스너
speechSynthesis.addEventListener('voiceschanged', getVoices); // 이게 필수
toggleBtn.addEventListener('click', showTextBox);
closeBtn.addEventListener('click', showTextBox);
voicesSelect.addEventListener('change', setVoice);
readBtn.addEventListener('click', () => {
  setMessage(text.value);
  speakText();
});

data.forEach(createGridItem);

getVoices();
