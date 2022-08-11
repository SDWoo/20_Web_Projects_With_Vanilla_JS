/* 
# 기능목록
1. 처음 들어왔을 때, movie pick 에 대한 정보 불러오기
- [o] - localStorage에서 해당 무비 픽에 대한 json 파일 받기
- [o] - 저 정보가 바뀌면 localStorage에 올리기.
- 올려야될것: 무비, selected index, 무비 가격, 

2. 해당 정보들로 화면 DOM 요소 구성해서 보여주기.
- [o] - count, total, seat selected로 classList 바꾸기
- [o] - select태그 바뀌면 그 가격으로 다시 total 바꿔주기
*/
const movie = document.querySelector('#movie');
const container = document.querySelector('.container');
const seats = container.querySelectorAll('.seat');
const selectedCount = document.querySelector('#count');
const total = document.querySelector('#total');

const init = () => {
  const initInfo = JSON.parse(localStorage.getItem('MovieInfo'));
  if (initInfo) {
    selectedCount.innerText = initInfo.count;
    total.innerText = initInfo.moviePrice * initInfo.count;
    initInfo.selectedIndex.forEach((idx) => {
      seats[idx].classList.add('selected');
    });
  }
};

const setMovieInfo = () => {
  let array = [];

  seats.forEach((seat) => {
    if (seat.classList.contains('selected')) {
      array.push([...seats].indexOf(seat));
    }
  });
  updateDOM(array.length, +movie.value);
  localStorage.setItem(
    'MovieInfo',
    JSON.stringify({
      moviePrice: +movie.value,
      count: +selectedCount.innerText,
      selectedIndex: array,
    })
  );
};

const updateDOM = (number, price) => {
  if (length > -1) {
    selectedCount.innerText = number;
    total.innerText = number * price;
  }
};

const getMovieInfo = () => {
  total.innerText = +count.innerText * +movie.value;
};

movie.addEventListener('change', getMovieInfo);

container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
  }

  setMovieInfo();
});

init();
