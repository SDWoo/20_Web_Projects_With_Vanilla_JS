const form = document.querySelector('#submit');
const input = form.querySelector('#search-input');
const randomBtn = document.querySelector('#random');
const resultHeading = document.querySelector('#result-heading');
const meals = document.querySelector('#meals');
const singleMeal = document.querySelector('#single-meal');

const getMealsByName = async (name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
  resultHeading.innerHTML = `<h2>Search result for '${name}'</h2>`;

  data.meals === null
    ? (resultHeading.innerHTML = `<h2>There's no result for '${name}'</h2>`)
    : (meals.innerHTML = `
  ${data.meals
    .map(
      (meal) => `
  <div class="meal">
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="meal-info" data-mealID="${meal.idMeal}">
        <h3>${meal.strMeal}</h3>
    </div>
  </div>
  `
    )
    .join('')}`);
};

const getMealById = async (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  const response = await fetch(url);
  const data = await response.json();

  const mealData = data.meals[0];

  console.log(mealData);
  addMealToDOM(mealData);
};

const submitInput = (e) => {
  e.preventDefault();
  const name = input.value;

  name.trim() ? getMealsByName(name) : alert('Please enter a search term');
};

const addMealToDOM = (mealData) => {
  const { strMeal, strMealThumb, strCategory, strArea } = mealData;
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (mealData[`strIngredient${i}`]) {
      ingredients.push(
        `${mealData[`strIngredient${i}`]} - ${mealData[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleMeal.innerHTML = `
    <div class="single-meal flex-column-center">
        <h1>${strMeal}</h1>
        <img src="${strMealThumb}" alt="${strMeal}" />
        <div class="single-meal-info flex-column-center" >
            ${strCategory ? `<p>${strCategory}</p>` : ''}
            ${strArea ? `<p>${strArea}</p>` : ''}
        </div>
        <ul>
            ${ingredients
              .map((ingredient) => `<li>${ingredient}</li>`)
              .join('')}
        </ul>
    </div>
    `;
};

const handleClickMeals = (e) => {
  const mealInfo = e.composedPath().find((item) => {
    if (item.classList.contains('meal-info')) {
      return item;
    }
  });

  const mealId = mealInfo.dataset.mealid;
  mealId ? getMealById(mealId) : alert('There is no information');
};

const handleRandomButton = async () => {
  meals.innerHTML = '';
  singleMeal.innerHTML = '';
  const url = `https://www.themealdb.com/api/json/v1/1/random.php`;
  const response = await fetch(url);
  const data = await response.json();

  const mealData = data.meals[0];

  addMealToDOM(mealData);
};

form.addEventListener('submit', submitInput);
randomBtn.addEventListener('click', handleRandomButton);
meals.addEventListener('click', handleClickMeals);
