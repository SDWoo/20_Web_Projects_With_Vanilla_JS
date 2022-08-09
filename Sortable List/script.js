const draggable_list = document.querySelector('#draggable-list');
const check = document.querySelector('#check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

const listItems = [];

let dragStartIndex;

createList();

function createList() {
  // copy를 만들기 위해 스프레드 문법사용
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      console.log(person, index);
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
    </div>`;

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}
function dragEnter() {
  this.classList.add('over');
}
function dragLeave() {
  this.classList.remove('over');
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItem(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

function swapItem(startIndex, endIndex) {
  const itemFrom = listItems[startIndex].querySelector('.draggable');
  const itemTo = listItems[endIndex].querySelector('.draggable');
  listItems[startIndex].appendChild(itemTo);
  listItems[endIndex].appendChild(itemFrom);
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

function checkOrder() {
  listItems.forEach((item, index) => {
    item.classList.remove('right');
    item.classList.remove('wrong');

    const person = item.querySelector('p');
    richestPeople.indexOf(person.innerText) === index
      ? item.classList.add('right')
      : item.classList.add('wrong');
  });
}

check.addEventListener('click', checkOrder);
