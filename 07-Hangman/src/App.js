import Game from './components/Game.js';
import Popup from './components/Popup.js';
import Notification from './components/Notification.js';

const WORDS = ['hangman', 'focus', 'relationship', 'starbucks'];

export default class App {
  constructor($app) {
    this.state = {
      isPopup: false,
      message: '',
      isNotification: false,
      wrongLetters: [],
      wrongCount: 0,
      correctLetters: [],
      answer: WORDS[Math.floor(Math.random() * WORDS.length)],
    };

    this.game = new Game({
      $app,
      initialState: {
        answer: this.state.answer,
        wrongCount: this.state.wrongCount,
        wrongLetters: this.state.wrongLetters,
        correctLetters: this.state.correctLetters,
      },
    });

    this.popup = new Popup({
      $app,
      initialState: {
        message: this.state.message,
        answer: this.state.answer,
        isPopup: this.state.isPopup,
      },
      onClick: () => {
        this.reset();
      },
    });

    this.notification = new Notification({
      $app,
      initialState: this.state.isNotification,
    });

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  setState(nextState) {
    this.state = nextState;
    this.game.setState({
      answer: this.state.answer,
      wrongCount: this.state.wrongCount,
      wrongLetters: this.state.wrongLetters,
      correctLetters: this.state.correctLetters,
    });
    this.popup.setState({
      message: this.state.message,
      answer: this.state.answer,
      isPopup: this.state.isPopup,
    });
    this.notification.setState({
      initialState: this.state.isNotification,
    });
  }
  arrayIncludes(array, letter, callback) {
    if (array.includes(letter)) {
      this.setState({
        ...this.state,
        isNotification: true,
      });
      return;
    }
    callback(letter);
  }

  handleKeyDown(e) {
    const { answer, correctLetters, wrongLetters } = this.state;
    console.log(e.currentTarget);
    if (e.keyCode < 65 || e.keyCode > 90) {
      return;
    }
    const letter = e.key;

    if (correctLetters.includes(letter) || wrongLetters.includes(letter)) {
      this.setState({
        ...this.state,
        Notification: true,
      });
      return;
    }

    if (answer.includes(letter)) {
      this.setState({
        ...this.state,
        correctLetters: [...this.state.correctLetters, letter],
        wrongCount: wrongLetters.length,
        isPopup: correctLetters.length + 1 === answer.length,
        message: 'Congratulations! You won! 😃',
        isNotification: false,
      });
    } else {
      this.setState({
        ...this.state,
        wrongLetters: [...this.state.wrongLetters, letter],
        wrongCount: wrongLetters.length,
        isPopup: wrongLetters.length + 1 === 5,
        message: 'Unfortunately you lost. 😕',
        isNotification: false,
      });
    }
  }

  reset() {
    this.setState({
      isPopup: false,
      message: '',
      isNotification: false,
      wrongLetters: [],
      wrongCount: 0,
      correctLetters: [],
      answer: WORDS[Math.floor(Math.random() * WORDS.length)],
    });
  }
}
