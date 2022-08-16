const balance = document.querySelector('#balance-value');
const moneyPlus = document.querySelector('#money-plus');
const moneyMinus = document.querySelector('#money-minus');
const list = document.querySelector('#list');
const form = document.querySelector('#form');
const text = document.querySelector('#text');
const amount = document.querySelector('#amount');
const removeBtn = document.querySelector('#delete-btn');

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') === null ? [] : localStorageTransactions;

const init = () => {
  list.innerHTML = '';
  transactions.forEach(addTransactionToDOM);
  updateValues();
};

const addTransaction = (e) => {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add text also amount');
    return;
  }

  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value,
  };
  transactions.push(transaction);
  addTransactionToDOM(transaction);
  updateLocalStorage();
  updateValues();

  text.value = '';
  amount.value = '';
};

const updateValues = () => {
  const amounts = transactions.map((transaction) => transaction.amount);
  const income = amounts
    .filter((amount) => amount >= 0)
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);

  const expense = (
    amounts.filter((amount) => amount < 0).reduce((acc, cur) => acc + cur, 0) *
    -1
  ).toFixed(2);
  const balnceValue = (income - expense).toFixed(2);
  balance.innerText = balnceValue;
  moneyPlus.innerText = income;
  moneyMinus.innerText = expense;
};

const generateID = () => {
  return Math.floor(Math.random() * 100000000);
};

const addTransactionToDOM = (transaction) => {
  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
    ${transaction.text} <span>${transaction.amount}</span>
    <button class="delete-btn" onClick=removeTransaction(${transaction.id})>x</button>
  `;

  list.appendChild(item);
};

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

const removeTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
};

form.addEventListener('submit', addTransaction);

init();
