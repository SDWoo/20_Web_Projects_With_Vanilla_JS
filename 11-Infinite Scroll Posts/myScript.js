// url `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`;
// limit 만큼, page 불러오기
/**
 # 기술 목록
1.  Fetch로 post 요청 보내기

- [o] - async/await Fetch 요청으로 데이터 받아오기
- [o] - 받아온 데이터 DOM요소 만들어 화면에 보여주기
- [o] - scroll 이벤트 받아서 스크롤이 끝이면 로딩 보여주기
- [o] - 그리고 몇 초 후 DOM요소 더 추가
- [o] - 검색하고 바로 filter
 */

const input = document.querySelector('#filter');
const postContainer = document.querySelector('#post-container');
const loader = document.querySelector('.loader');

let limit = 5;
let page = 1;
let filterText = '';

const getData = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();

  return data;
};

const init = async () => {
  const data = await getData();

  data.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');

    postEl.innerHTML = `
    <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
    </div>`;

    postContainer.appendChild(postEl);
  });

  filterPosts();
};

const filterPosts = () => {
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText;
    const body = post.querySelector('.post-body').innerText;

    if (!title.includes(filterText) && !body.includes(filterText)) {
      post.style.display = 'none';
      return;
    }

    post.style.display = 'flex';
  });
};

const showLoader = () => {
  loader.classList.add('show');
  page++;
  init();
  setTimeout(() => {
    loader.classList.remove('show');
    setTimeout(() => {
      page++;
      init();
    }, 300);
  }, 1000);
};

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight + 5 >= scrollHeight) {
    showLoader();
  }
});

input.addEventListener('input', (e) => {
  filterText = e.target.value;
  filterPosts();
});

init();
