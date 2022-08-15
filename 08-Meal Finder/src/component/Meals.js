export default class Meals {
  // meals
  constructor({ $container, initialState, onClick }) {
    this.state = initialState;
    this.onClick = onClick;
    this.$target = document.createElement('div');
    this.$target.setAttribute('class', 'meals');
    this.$target.setAttribute('id', 'meals');
    $container.appendChild(this.$target);

    this.$target.addEventListener('click', (e) => {
      const mealInfo = e.target.closest('.meal-info');

      if (!mealInfo) return;

      const mealId = mealInfo.dataset.mealid;
      const selectedMeal = this.state.find((meal) => meal.idMeal === mealId);

      if (!selectedMeal) return;

      this.onClick(selectedMeal);
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `
        ${this.state
          .map(
            (meal) =>
              `
            <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
                </div>
            </div>
            `
          )
          .join('')}
    `;
  }
}
