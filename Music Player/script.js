// 구현 목록
// 1. 처음 시작시 비디오랑 커버, 이름 받아오기
// [o] - audio.src에 비디오 추가.
// [o] - cover.src에 커버 추가.
// [o] - title에 이름 추가

// 2. 버튼 누를 시 음악 재생, 넘겨주기, 받아오기
// [o] - 시작 버튼 누르면 classList에 play 추가.
// [o] - 추가 되고, 그리고 그 pop-up 창 띄워주기.
// [x] - 프로그레스 바 클릭시 해당 초로 넘겨주기.
// [o] - 다음(이전) 버튼 누르면 다음 음악 받아오기 (비디오, 커버, 타이틀)

const musicContainer = document.querySelector('.music-container');

const title = document.querySelector('#title');
const audio = document.querySelector('audio');
const cover = document.querySelector('#cover');

const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');

const prev = document.querySelector('#prev');
const play = document.querySelector('#play');
const next = document.querySelector('#next');

// 노래 타이틀
const songs = ['hey', 'summer', 'ukulele'];

// keep tracks of song
let songIndex = 1;

// 처음 로드
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpeg`;
}

// 노래 시작
function playSong() {
  musicContainer.classList.add('play');
  play.querySelector('i.fas').classList.remove('fa-play');
  play.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

// 노래 멈추기
function pauseSong() {
  musicContainer.classList.remove('play');
  play.querySelector('i.fas').classList.remove('fa-pause');
  play.querySelector('i.fas').classList.add('fa-play');
  audio.pause();
}

// 노래가 계속되고 있는지 체크
function isPlaying(pause, play) {
  const isPlaySong = musicContainer.classList.contains('play');
  isPlaySong ? pause() : play();
}

// 다음 송 받아오기 -> 인덱스 2인 경우만 따져주면 됨
function loadNextSong() {
  songIndex === 2 ? (songIndex = 0) : songIndex++;
  loadSong(songs[songIndex]);
  playSong();
}

// 이전 송 받아오기 -> 인덱스 0인 경우만 따져주자
function loadPrevSong() {
  songIndex === 0 ? (songIndex = 2) : songIndex--;
  loadSong(songs[songIndex]);
  playSong();
}

// 프로그레스 바 업데이트하기
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// 프로그레스 클릭시 페선트 셋
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// 처음 노래 받아오기
loadSong(songs[songIndex]);

// 이벤트 리스너 만들기
play.addEventListener('click', () => {
  isPlaying(pauseSong, playSong);
});
// 노래 변경 이벤트 리스너
next.addEventListener('click', loadNextSong);
prev.addEventListener('click', loadPrevSong);

// 프로그레스 바  업데이트
audio.addEventListener('timeupdate', updateProgress);

// 프로그레스 바 클릭 이벤트 리스너
progressContainer.addEventListener('click', setProgress);

// 노래가 끝나면 다음노래
audio.addEventListener('ended', loadNextSong);
