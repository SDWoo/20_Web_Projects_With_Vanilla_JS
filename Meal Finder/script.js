// step 1. 검색
// [o] - input에 입력하고 검색버튼 누르면 해당 검색어에 대한 정보 받아오기
// [o] - 해당 정보들 화면에 띄워주기
// [] - 사진 클릭하면 그 메뉴에 대한 자세한 정보 띄워주기

// step 2. random 버튼
// [] - random 버튼 누르면 랜덤 메뉴 자세한 정보 띄워주기
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

  if (term.trim()) {
    getMealsByName(term);
  } else {
    alert('Please enter a search term');
  }
}

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
  console.log(meal);
};

function addMealToDOM(meal) {
  const ingredients = [];

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
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.dataset.mealid;
    getMealById(mealID);
  }
});
