/* 
<li class="minus">
    Cash <span>-$400</span> <button class="delete-btn">x</button>
</li>*/

// 구현 목록
// [] text와 amount에 값을 입력한다. local Storage 저장?
// [o] add transaction 버튼을 누르면 해당 정보를 갖고 history에 보여준다.
// []
// local storage에 저장해야 될 떄 => addTransaction, removeTransaction
// local Storage에서 받아올 때 => 처음 init 했을 때, add, remove, DOM 바꾸기 전

const balance = document.querySelector('#balance-value');
const moneyPlus = document.querySelector('#money-plus');
const moneyMinus = document.querySelector('#money-minus');
const list = document.querySelector('#list');
const form = document.querySelector('#form');
const text = document.querySelector('#text');
const number = document.querySelector('#amount');
const removeBtn = document.querySelector('.delete-btn');
const addBtn = document.querySelector('.btn');

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// 새로운 트랜잭션 추가
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || number.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +number.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = '';
    number.value = '';
  }
}
// ID 생성기
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// 1. 트랜잭션 원소를 DOM List에 추가하기
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}
    </span>
    <button class="delete-btn" onClick=removeTransaction(${
      transaction.id
    })>x</button>
  `;

  list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, cur) => (acc += cur), 0);
  const income = amounts
    .filter((num) => num > 0)
    .reduce((acc, cur) => (acc += cur), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((num) => num < 0).reduce((acc, cur) => (acc += cur), 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
}

//Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((item) => item.id !== id);
  updateLocalStorage();

  init();
}

// 로컬 스토리지 업데이트
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

//init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}

// 이벤트 리스너

form.addEventListener('submit', addTransaction);

init();
