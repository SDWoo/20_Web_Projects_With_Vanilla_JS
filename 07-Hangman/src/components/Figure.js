export default class Figure {
  // wrong count
  constructor({ $game, initialState }) {
    this.state = initialState;
    this.$target = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    this.$target.setAttribute('height', '250');
    this.$target.setAttribute('width', '200');
    this.$target.classList.add('figure-container');
    $game.appendChild(this.$target);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const bodyFigures = [
      '<circle cx="140" cy="70" r="20" class="figure-parts"></circle>',
      '<line x1="140" y1="90" x2="140" y2="150" class="figure-parts"></line>',
      '<line x1="140" y1="120" x2="120" y2="100" class="figure-parts"></line>',
      '<line x1="140" y1="120" x2="160" y2="100" class="figure-parts"></line>',
      '<line x1="140" y1="150" x2="120" y2="170" class="figure-parts"></line>',
      '<line x1="140" y1="150" x2="160" y2="170" class="figure-parts"></line>',
    ];

    this.$target.innerHTML = `
        <line x1="60" y1="20" x2="140" y2="20"></line>
        <line x1="140" y1="20" x2="140" y2="50"></line>
        <line x1="60" y1="20" x2="60" y2="230 "></line>
        <line x1="20" y1="230" x2="100" y2="230"></line>
        ${bodyFigures.map((figure, index) => {
          index < this.state.wrongCount ? figure : '';
        })}
    `;
  }
}
