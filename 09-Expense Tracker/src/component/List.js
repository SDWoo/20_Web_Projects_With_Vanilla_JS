export default class List {
  constructor({ $container, initialState, onClick }) {
    this.state = initialState;
    this.onClick = onClick;
    this.$target = document.createElement('div');
    $container.appendChild(this.$target);
    this.render();
    this.$target.addEventListener('click', (e) => {
      if (!e.target.classList.contains('delete-btn')) {
        return;
      }
      const { nodeId } = e.target.dataset;
      this.onClick(+nodeId);
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `
    <h3>History</h3>
      <ul id="list" class="list">
      ${this.state
        .map(
          (transaction, index) => `
        <li class="${transaction.amount < 0 ? 'minus' : 'plus'}" >
            ${transaction.text} <span>${transaction.amount}</span>
            <button class="delete-btn" data-node-id=${index}>x</button>
        </li>
        `
        )
        .join('')}
      </ul>
    `;
  }
}
