// 기능 목록

// [] - 버튼을 누르면 해당 문장을 읽어준다.
// [] - toggle Text Boxs누르면 악센트 선택, 텍스트 입력, 읽어주기 버튼이 있음

const main = document.querySelector('main');
const voiceSelect = document.querySelector('#voices');
const textarea = document.querySelector('#text');
const textbox = document.querySelector('#text-box');

const readBtn = document.querySelector('#read');
const closeBtn = document.querySelector('#close');
const toggleBtn = document.querySelector('#toggle');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

let voices = [];
const message = new SpeechSynthesisUtterance();

data.forEach(createBox);

function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');
  box.innerHTML = `
  <img src="${image}" alt="${text}" /> 
  <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // active effect로 박스 그림자 바뀌게 함
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// 텍스트 메시지 정하기
function setTextMessage(text) {
  message.text = text;
}

// 텍스트 말하기
function speakText() {
  speechSynthesis.speak(message);
}
// textbox toggle
function toggleTextBox() {
  textbox.classList.toggle('show');
}

// 목소리 받아오기
function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voiceSelect.appendChild(option);
  });
}

function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// 이벤트 리스너
// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

voiceSelect.addEventListener('change', setVoice);

// 텍스트 박스 보여주기
toggleBtn.addEventListener('click', toggleTextBox);
closeBtn.addEventListener('click', toggleTextBox);
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
