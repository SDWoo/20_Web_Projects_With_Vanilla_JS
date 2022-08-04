const form = document.querySelector('#form');
const input = document.querySelector('input');
const result = document.querySelector('#result');
const more = document.querySelector('#more');

const apiURL = 'https://api.lyrics.ovh';

// data 화면에 보여주기
function showData(data) {
  result.innerHTML = `
  <ul class="songs">
    ${data.data
      .map(
        (song) => `
    <li>
        <span><strong>${song.artist.name}</strong> - 
        ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}"
        data-songtitle="${song.title}">Get Lyrics</button>
    </li>
    `
      )
      .join('')}
  </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
    ${
      data.prev
        ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
        : ''
    }
    ${
      data.next
        ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
        : ''
    }`;
  } else {
    more.innerHTML = '';
  }
}
// 노래 가사 받아오기
async function getLyrics(artist, title) {
  const res = await fetch(`${apiURL}/v1/${artist}/${title}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

  result.innerHTML = `<h2<strong>${artist}</strong> - ${title}</h2>
  
  <span>${lyrics}</span>`;
}

// 다음, 이전 버튼 클릭시 하는 것
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/ ${url}`);
  const data = await res.json();

  showData(data);
}

// 노래 검색하기
async function searchTerm(searchTerm) {
  const url = `${apiURL}/suggest/${searchTerm}`;
  const response = await fetch(url);
  const data = await response.json();

  showData(data); // 오래걸림
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const term = input.value.trim();

  if (!term) {
    alert('Please type in a search term');
  } else {
    searchTerm(term);
  }
});

result.addEventListener('click', (e) => {
  const clickedEl = e.target;

  if (clickedEl === 'BUTTON') {
    console.log('yeah~');
    const artist = clickedEl.getAttribute('data-artist');
    const title = clickedEl.getAttribute('data-songtitle');

    getLyrics(artist, title);
  }
});
