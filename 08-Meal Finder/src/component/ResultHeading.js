export default class ResultHeading {
  // heading message
  constructor({ $container, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.setAttribute('id', 'result-heading');
    $container.appendChild(this.$target);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `
    <h2>${this.state}</h2>
    `;
    this.$target.style.display = this.state ? 'block' : 'none';
  }
}
