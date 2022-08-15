export default class SingleMeal {
  // mealData
  constructor({ $container, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.setAttribute('id', 'single-meal');
    $container.appendChild(this.$target);
  }

  setState(nextState) {
    if (Boolean(nextState)) {
      this.state = nextState;
      this.render();
    }
  }

  getIngredients() {
    const strs = [];

    for (let i = 1; i <= 20; ++i) {
      const ingr = this.state[`strIngredient${i}`];
      const meas = this.state[`strMeasure${i}`];
      if (!ingr) break;
      strs.push(`<li>${ingr} - ${meas}</li>`);
    }
    return strs;
  }

  getLi() {
    const str = [];
    for (let i = 1; i <= 20; ++i) {
      const ingre = this.state[`strIngredient${i}`];
      const measure = this.state[`strMeasure${i}`];
      if (!ingre) break;
      str.push(`<li>${ingre} - ${measure}</li>`);
    }
    return str;
  }

  render() {
    console.log(this.state);
    const { strMeal, strMealThumb, strCategory, strArea } = this.state;
    this.$target.innerHTML = `
    <div class="single-meal flex-column-center">
        <h1>${strMeal}</h1>
        <img src="${strMealThumb}" alt="${strMeal}" />
        <div class="single-meal-info flex-column-center" >
            ${strCategory ? `<p>${strCategory}</p>` : ''}
            ${strArea ? `<p>${strArea}</p>` : ''}
        </div>
        <h2>Ingredients</h2>
        <ul>
            ${this.getIngredients().join('')}
        </ul>
    </div>
    `;
  }
}
