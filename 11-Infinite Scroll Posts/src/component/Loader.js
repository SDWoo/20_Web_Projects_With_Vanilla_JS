export default class Loader {
  // 여기서 쓸 state는? isLoading
  constructor({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'loader';
    $app.appendChild(this.$target);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    console.log(this.state);
    this.$target.innerHTML = `
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    `;
    this.$target.className = this.state ? 'loader show' : 'loader';
  }
}
