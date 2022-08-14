export default class Notification {
  constructor({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.setAttribute('class', 'notification-container');
    this.$target.setAttribute('id', 'notification-container');
    $app.appendChild(this.$target);

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `
        <p>You have already entered this letter</p>
    `;

    if (!this.state) {
      this.$target.classList.remove('show');
      return;
    }

    this.$target.classList.add('show');
    setTimeout(() => {
      this.$target.classList.remove('show');
    }, 2000);
  }
}
