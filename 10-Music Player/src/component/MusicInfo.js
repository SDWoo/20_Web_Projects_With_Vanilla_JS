export default class MusicInfo {
  constructor({ $app, initialState, onClickProgress }) {
    this.state = initialState;
    this.onClickProgress = onClickProgress;
    this.$target = document.createElement('div');
    this.$target.className = 'music-info';
    $app.appendChild(this.$target);
    this.render();
    this.$target.addEventListener('click', (e) => {
      const progressContainer = e.target.closest('.progress-container');
      if (progressContainer) {
        const { x, width } = e.target.getBoundingClientRect();
        const clickPercent = Math.min(Math.abs(e.clientX - x) / width, 1);
        this.onClickProgress(clickPercent);
      }
    });
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  progress(width) {
    this.$target.querySelector('#progress').style.width = `${width}%`;
  }
  render() {
    this.$target.innerHTML = `<h4 id="title">${this.state}</h4>
    <div class="progress-container" id="progress-container">
      <div class="progress" id="progress"></div>
    </div>`;
  }
}
