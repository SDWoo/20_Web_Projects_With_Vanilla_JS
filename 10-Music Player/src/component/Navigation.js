export default class Navigation {
  // state => play
  constructor({ $app, initialState, onClickNext, onClickPrev, onClickPlay }) {
    this.state = initialState;
    this.onClickNext = onClickNext;
    this.onClickPlay = onClickPlay;
    this.onClickPrev = onClickPrev;
    this.$target = document.createElement('div');
    this.$target.className = 'navigation';
    $app.appendChild(this.$target);
    this.render();

    this.$target.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (btn) {
        const id = btn.id;
        if (id === 'prev') {
          this.onClickPrev();
        } else if (id === 'play') {
          this.onClickPlay();
        } else if (id === 'next') {
          this.onClickNext();
        }
      }
    });
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    this.$target.innerHTML = ` <button id="prev" class="action-btn">
        <i class="fas fa-backward"></i>
      </button>
      <button id="play" class="action-btn action-btn-big">
        <i class="fas fa-${this.state ? 'pause' : 'play'}"></i>
      </button>
      <button id="next" class="action-btn">
        <i class="fas fa-forward"></i>
      </button>`;
  }
}
