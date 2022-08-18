import Filter from './component/Filter.js';
import Loader from './component/Loader.js';
import PostContainer from './component/PostContainer.js';
import { getData } from './api/Fetch.js';
export default class App {
  constructor($app) {
    this.state = {
      page: 1,
      posts: [],
      renderPosts: [],
      isLoading: false,
      filterText: '',
    };

    this.$target = $app;
    this.filterPost = () => {
      const { filterText } = this.state;
      if (!filterText) {
        this.setState({
          ...this.state,
          renderPosts: [...this.state.posts],
        });
        return;
      }
      const renderPosts = this.state.posts.filter((post) => {
        const title1 = post.title;
        const body1 = post.body;

        return title1.includes(filterText) || body1.includes(filterText);
      });

      this.setState({
        ...this.state,
        renderPosts,
      });
    };

    this.filter = new Filter({
      $app,
      setFilterText: (filterText) => {
        this.setState({
          ...this.state,
          filterText,
        });
      },
      filterPost: this.filterPost,
    });

    this.postContainer = new PostContainer({
      $app,
      initialState: this.state.renderPosts,
      filterPost: this.filterPost,
    });

    this.loader = new Loader({
      $app,
      initialState: this.state.isLoading,
    });

    this.init();
    window.addEventListener('scroll', () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight === scrollHeight) {
        this.showLoader();
      }
    });
  }

  showLoader() {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    setTimeout(async () => {
      const newPosts = await getData(this.state.page);
      this.setState({
        ...this.state,
        page: this.state.page + 1,
        posts: [...this.state.posts, ...newPosts],
        renderPosts: [...this.state.renderPosts, ...newPosts],
        isLoading: false,
      });
    }, 1000);
  }

  async init() {
    const posts = await getData(this.state.page);
    console.log(posts);
    this.setState({
      ...this.state,
      page: this.state.page + 1,
      posts,
      renderPosts: [...posts],
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.postContainer.setState(this.state.renderPosts);
    this.loader.setState(this.state.isLoading);
  }
}
