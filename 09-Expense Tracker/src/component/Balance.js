export default class Balance {
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
    this.$target.innerHTML = `
    <h4>YOUR BALANCE</h4>
    <h1 id="balance-value">${this.state}</h1>
    `;
  }
}
