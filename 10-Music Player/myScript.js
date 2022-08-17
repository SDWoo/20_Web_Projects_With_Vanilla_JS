// 구현 목록
// 1. 처음 시작시 비디오랑 커버, 이름 받아오기
// [o] - audio.src에 비디오 추가.
// [o] - cover.src에 커버 추가.
// [o] - title에 이름 추가

// 2. 버튼 누를 시 음악 재생, 넘겨주기, 받아오기
// [o] - 시작 버튼 누르면 classList에 play 추가.
// [o] - 추가 되고, 그리고 그 pop-up 창 띄워주기.
// [] - 프로그레스 바 클릭시 해당 초로 넘겨주기.
// [o] - 다음(이전) 버튼 누르면 다음 음악 받아오기 (비디오, 커버, 타이틀)
const musicContainer = document.querySelector('.music-container');

const title = document.querySelector('#title');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const audio = document.querySelector('audio');
const img = document.querySelector('#cover');

// btns
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');

const musics = ['hey', 'summer', 'ukulele'];

let selectedIndex = 1;

const init = () => {
  title.innerText = musics[selectedIndex];
  audio.src = `music/${musics[selectedIndex]}.mp3`;
  img.src = `images/${musics[selectedIndex]}.jpeg`;
};

const handlePlayBtn = () => {
  if (audio.paused) {
    musicContainer.classList.add('play');
    audio.play();
    playBtn.firstElementChild.className = 'fas fa-pause';
  } else {
    musicContainer.classList.remove('play');
    audio.pause();
    playBtn.firstElementChild.classList = 'fas fa-play';
  }

  handleProgress();
};

const handleProgress = () => {
  const time = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${time}%`;
};

const handleNextBtn = () => {
  selectedIndex < musics.length - 1 ? selectedIndex++ : (selectedIndex = 0);
  init();
  musicContainer.classList.contains('play') ? audio.play() : audio.pause();
};

const handlePrevBtn = () => {
  selectedIndex < 1 ? (selectedIndex = 2) : selectedIndex--;
  init();
  musicContainer.classList.contains('play') ? audio.play() : audio.pause();
};

const setProgress = (e) => {
  const { x } = e.target.getBoundingClientRect();
  audio.currentTime = (e.offsetX / x) * audio.duration;
};
playBtn.addEventListener('click', handlePlayBtn);
nextBtn.addEventListener('click', handleNextBtn);
prevBtn.addEventListener('click', handlePrevBtn);

audio.addEventListener('timeupdate', handleProgress);
progressContainer.addEventListener('click', setProgress);

init();
