/*
# 기능 목록 (forEach, map, sort, filter, reduce 쓰기)
- [o] - api요청해서 유저를 받아와 화면에 보여준다. ForEach
- [o] - add User 버튼을 클릭하면 유저 추가를 하나 더 해준다.
- [o] - Double Money 버튼을 클릭하면 전체 유저 Wealth를 두배를 해준다. map
- [o] - Show Only Millionaires를 클릭하면 100만 달러 넘는 사람들만 보여준다. filter
- [o] - Sort by Richest를 클릭하면 오름차순으로 정렬한다. sort
- [] - Calculate entire Wealth 를 클릭하면 전체를 더한 값을 보여준다. */

const main = document.querySelector('#main');
const addUserBtn = document.querySelector('#add-user');
const doubleBtn = document.querySelector('#double');
const showMillionairesBtn = document.querySelector('#show-millionaires');
const sortBtn = document.querySelector('#sort');
const calculateWealthBtn = document.querySelector('#calculate-wealth');

let users = [];

const getUser = async () => {
  const response = await fetch('https://randomuser.me/api');
  const data = await response.json();

  const user = data.results[0];
  const userData = {
    name: `${user.name.first} ${user.name.last}`,
    wealth: Math.floor(Math.random() * 1000000),
  };

  users.push(userData);
  updateDOM();
};

const doubleWealth = () => {
  users = users.map((user) => {
    return { ...user, wealth: user.wealth * 2 };
  });
  updateDOM();
};

const showMillionaires = () => {
  users = users.filter((user) => {
    return user.wealth >= 1000000;
  });
  updateDOM();
};

const sortUsers = () => {
  users.sort((a, b) => a.wealth - b.wealth);

  updateDOM();
};

const calculateWealth = () => {
  const wealth = users.reduce((acc, cur) => (acc += cur.wealth), 0);

  const totalWealth = document.createElement('div');
  totalWealth.innerHTML = `<h3><strong>Total Wealth</strong>${formatMoney(
    wealth
  )}</h3>`;

  main.appendChild(totalWealth);
};

const updateDOM = (updateUsers = users) => {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
  updateUsers.forEach((user) => {
    const person = document.createElement('div');
    person.classList.add('person');
    person.innerHTML = `<strong>${user.name}</strong>${formatMoney(
      user.wealth
    )}`;

    main.appendChild(person);
  });
};

const formatMoney = (number) => {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

getUser();
addUserBtn.addEventListener('click', getUser);
doubleBtn.addEventListener('click', doubleWealth);
showMillionairesBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortUsers);
calculateWealthBtn.addEventListener('click', calculateWealth);
