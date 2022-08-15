const form = document.querySelector('#submit');
const searchInput = document.querySelector('#search-input');
const randomBtn = document.querySelector('.random-button');
const resultHeading = document.querySelector('#result-heading');
const mealsEl = document.querySelector('#meals');
const singleMealEl = document.querySelector('#single-meal');

const getMealsByName = async (name) => {
  const data = await getData(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );

  resultHeading.innerHTML = `<h2>Search results for '${name}':</h2>`;

  data.meals === null
    ? (resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`)
    : (mealsEl.innerHTML = data.meals
        .map(
          (meal) => `
    <div class = "meal">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="meal-info" data-mealID="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
        </div>
    </div>
  `
        )
        .join(''));
};

// search Meal function
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  singleMealEl.innerHTML = '';

  // Get search term
  const term = searchInput.value;

  term.trim() ? getMealsByName(term) : alert('Please enter a search term');
}

//
const getData = async (url) => {
  const response = await fetch(url);
  const data = response.json();

  return data;
};

const getRandomMeal = async () => {
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  const data = await getData(
    `https://www.themealdb.com/api/json/v1/1/random.php`
  );

  const meal = data.meals[0];
  addMealToDOM(meal);
};

// Fetch meal by ID
const getMealById = async (mealId) => {
  const data = await getData(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const meal = data.meals[0];

  addMealToDOM(meal);
};

// Meal data add to DOM
function addMealToDOM(meal) {
  const ingredients = [];

  console.log(meal[strIngredient1]);
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleMealEl.innerHTML = `
    <div class="single-meal flex-column-center">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="single-meal-info flex-column-center">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
        </div>
        <div class="main flex-column-center">
            <p>${meal.strInstructions}</p>
            <h2>Ingrediets</h2>
            <ul>
                ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
            </ul>
        </div>
    </div>
  `;
}

// Event listener
form.addEventListener('submit', searchMeal);

randomBtn.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', (e) => {
  console.log(e.composedPath());
  const mealInfo = e.composedPath().find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  console.log(mealInfo);
  if (mealInfo) {
    const mealID = mealInfo.dataset.mealid;
    getMealById(mealID);
  }
});
