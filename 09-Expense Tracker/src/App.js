import Container from './component/Container.js';
export default class App {
  constructor($app) {
    $app.innerHTML = '<h2 class="title">Expense Tracker</h2>';
    this.container = new Container($app);
  }
}
