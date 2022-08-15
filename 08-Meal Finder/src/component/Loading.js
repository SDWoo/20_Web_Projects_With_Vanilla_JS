export default class Loading {
  constructor({ $container, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    $container.appendChild(this.$target);
    this.render();
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    this.$target.textContent = 'Loading...';
    this.$target.style.display = this.state ? 'block' : 'none';
  }
}
