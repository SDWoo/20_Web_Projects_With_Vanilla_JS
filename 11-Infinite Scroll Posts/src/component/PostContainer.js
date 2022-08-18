export default class PostContainer {
  // 여기서 쓸 state는? post데이터 정도
  constructor({ $app, initialState, filterPost }) {
    this.state = initialState;
    this.filterPost = filterPost;
    this.$target = document.createElement('div');
    $app.appendChild(this.$target);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    if (!this.state) return;
    this.$target.innerHTML = `
   ${this.state
     .map(
       (post) => `
     <div class="post">
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>
    </div>`
     )
     .join('')} `;
  }
}
