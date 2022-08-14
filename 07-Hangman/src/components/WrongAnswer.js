export default class WrongAnswer {
  // wrongLetters
  constructor({ $game, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.classList.add('wrong-answer-container');
    $game.appendChild(this.$target);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `
    <div id="wrong-letter">
        ${this.state.wrongLetters.length > 0 ? `<p>Wrong</p>` : ''}
        ${this.state.wrongLetters.map((letters) => `<span>${letters}</span>`)}
    </div>
    `;
  }
}
