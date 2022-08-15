import Container from './component/Container.js';

export default class App {
  constructor($app) {
    this.container = new Container($app);
  }
}
