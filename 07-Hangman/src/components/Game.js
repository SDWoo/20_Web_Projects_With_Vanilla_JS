import Figure from './Figure.js';
import EnterAnswer from './EnterAnswer.js';
import WrongAnswer from './Wronganswer.js';

export default class Game {
  // wrongCount, wrongLetters, correctLetters
  constructor({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'game-container';
    $app.appendChild(this.$target);

    this.figure = new Figure({
      $game: this.$target,
      initialState: {
        wrongCount: this.state.wrongCount,
      },
    });

    this.wrongAnswer = new WrongAnswer({
      $game: this.$target,
      initialState: {
        wrongLetters: this.state.wrongLetters,
      },
    });

    this.enterAnswer = new EnterAnswer({
      $game: this.$target,
      initialState: {
        answer: this.state.answer,
        correctLetters: this.state.correctLetters,
      },
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.figure.setState({
      wrongCount: this.state.wrongCount,
    });
    this.wrongAnswer.setState({
      wrongLetters: this.state.wrongLetters,
    });
    this.enterAnswer.setState({
      answer: this.state.answer,
      correctLetters: this.state.correctLetters,
    });
  }
}
