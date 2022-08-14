export default class EnterAnswer {
  //  answer, correctLetters
  constructor({ $game, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.classList.add('enter-answer-container');
    $game.appendChild(this.$target);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const { answer, correctLetters } = this.state;
    this.$target.innerHTML = `
    ${answer
      .split('')
      .map(
        (letter) => `
    <span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>
    `
      )
      .join('')}`;
  }
}
