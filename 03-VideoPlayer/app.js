/*
# 기능목록
- [o] - 재생 버튼을 누르면 비디오 시작하고 play 아이콘 바꾸기
- [o] - 스탑 버튼 누르면 비디오 멈추고 시간, progress, timestamp 복구
- [o] - 비디오 눌렀을 시에도 재생, 멈춤 기능과 같이 구현
- [o] - 비디오 진행됨에 따라 progress바, timestamp바뀌기
- [o] - progress바 클릭(value)에 따라 비디오 움직이기 */

const video = document.querySelector('#video');
const play = document.querySelector('#play');
const stop = document.querySelector('#stop');
const progress = document.querySelector('#progress');
const timestamp = document.querySelector('#timestamp');

const updateVideoStatus = () => {
  video.paused ? video.play() : video.pause();
};

const updatePlayIcon = () => {
  const icon = play.childNodes[1];
  icon.className = video.paused ? 'fa fa-play fa-2x' : 'fa fa-pause fa-2x';
};

const updateVideoTime = () => {
  progress.value = (video.currentTime / video.duration) * 100;
  let minutes = String(Math.floor(video.currentTime / 60)).padStart(2, 0);
  let seconds = String(Math.floor(video.currentTime % 60)).padStart(2, 0);
  timestamp.innerText = `${minutes}:${seconds}`;
};

const stopVideo = () => {
  video.pause();
  video.currentTime = 0;
  timestamp.innerText = '00:00';
};

const updateProgress = () => {
  video.currentTime = (+progress.value / 100) * video.duration;
};

video.addEventListener('click', updateVideoStatus);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('ended', stopVideo);
video.addEventListener('timeupdate', updateVideoTime);

play.addEventListener('click', updateVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', updateProgress);
