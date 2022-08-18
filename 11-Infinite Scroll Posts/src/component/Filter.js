export default class Filter {
  // 여기서 쓸 state는? no
  constructor({ $app, setFilterText, filterPost }) {
    this.filterPost = filterPost;
    this.setFilterText = setFilterText;
    this.$target = document.createElement('div');
    this.$target.className = 'filter-container';
    $app.appendChild(this.$target);
    this.render();

    this.$target.querySelector('#filter').addEventListener('input', (e) => {
      const filterText = e.target.value;

      this.setFilterText(filterText);
      this.filterPost();
    });
  }

  render() {
    this.$target.innerHTML = `
    <input
        type="text"
        id="filter"
        class="filter"
        placeholder="Filter posts..."
      />
    `;
  }
}
