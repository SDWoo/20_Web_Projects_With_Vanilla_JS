import InputContainer from './InputContainer.js';
import ResultHeading from './ResultHeading.js';
import Meals from './Meals.js';
import SingleMeal from './SingleMeal.js';
import Loading from './Loading.js';
import { searchItemAPI, searchRandomAPI } from '../api/api.js';

const cache = {};

export default class Container {
  constructor($app) {
    this.state = {
      meals: [],
      meal: null,
      searchWord: '',
      message: '',
      isLoading: false,
    };
    this.$target = document.createElement('div');
    this.$target.className = 'container';
    this.$target.innerHTML = `<h1>Meal Finder</h1>`;
    $app.appendChild(this.$target);

    this.inputContainer = new InputContainer({
      $container: this.$target,
      onSubmit: async (searchWord) => {
        this.setState({
          ...this.state,
          isLoading: true,
        });
        try {
          if (cache[searchWord]) {
            this.setState({
              ...this.state,
              searchWord,
              meals: cache[searchWord],
            });
          } else {
            const { meals } = await searchItemAPI(searchWord);
            this.setState({
              ...this.state,
              searchWord,
              meals,
            });
            cache[searchWord] = meals;
          }
        } catch (e) {
          console.log(e);
        } finally {
          this.setState({
            ...this.state,
            isLoading: false,
          });
        }
      },

      onClick: async () => {
        this.setState({
          ...this.state,
          isLoading: true,
        });
        try {
          const { meals } = await searchRandomAPI();
          this.setState({
            ...this.state,
            meals: [],
            meal: meals[0],
            searchWord: '',
          });
        } catch (e) {
          console.log(e);
        } finally {
          this.setState({
            ...this.state,
            isLoading: false,
          });
        }
      },
    });

    this.resultHeading = new ResultHeading({
      $container: this.$target,
      initialState: this.state.message,
    });

    this.loading = new Loading({
      $container: this.$target,
      initialState: false,
    });

    this.meals = new Meals({
      $container: this.$target,
      initialState: this.state.meals,
      onClick: (selectedMeal) => {
        this.setState({
          ...this.state,
          meal: selectedMeal,
        });
      },
    });

    this.singleMeal = new SingleMeal({
      $container: this.$target,
      initialState: this.state.meal,
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.resultHeading.setState(this.state.message);
    this.loading.setState(this.state.isLoading);
    this.meals.setState(this.state.meals);
    this.singleMeal.setState(this.state.meal);
  }
}
