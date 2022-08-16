export default class Form {
  constructor({ $container, onSubmit }) {
    this.onSubmit = onSubmit;
    this.$target = document.createElement('div');
    $container.appendChild(this.$target);
    this.render();
    this.$target.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const text = e.target.querySelector('#text');
      const amount = e.target.querySelector('#amount');
      this.onSubmit(text.value, +amount.value);
      e.target.querySelector('#text').value = '';
      amount.value = '';
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `
    <h3>Add new transaction</h3>
      <form id="form">
        <div class="form-control">
          <label for="text">Text</label>
          <input type="text" id="text" placeholder="Enter text..." />
        </div>
        <div class="form-control">
          <label for="amount"
            >Amount <br />
            (nagative - expense, positive - income)</label
          >
          <input type="number" id="amount" placeholder="Enter amount..." />
        </div>
        <button class="btn">Add transaction</button>
      </form>
    `;
  }
}
