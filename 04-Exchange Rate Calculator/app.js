/*
# 기능 목록
- [] - 첫번째 select에 있는 값으로 API요청해서 두번째 select에 있는 환율 받아오기
- [] - 해당 환율로 첫번째 input에 따른 두번째 input 값 바꾸기
- [] - swap 버튼 누르면 select값 뒤바꿔서 api요청 후 받아온 값으로 화면 바꾸기

*/
const API_KEY = '1eb5c3885df94a9713aa338a';
const API_URL =
  'https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency_one}';
const currencyOne = document.querySelector('#currency-one');
const currencyTwo = document.querySelector('#currency-two');
const firstInput = document.querySelector('#amount-one');
const secondInput = document.querySelector('#amount-two');
const rateEl = document.querySelector('#rate');
const swapBtn = document.querySelector('#swap');

const calculate = async () => {
  const currency_one = currencyOne.value;
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency_one}`
  );
  const data = await response.json();
  const rate = data.conversion_rates[currencyTwo.value];

  rateEl.innerText = `${firstInput.value} ${currencyOne.value} = ${rate} ${currencyTwo.value}`;
  secondInput.value = firstInput.value * rate;
};

calculate();
