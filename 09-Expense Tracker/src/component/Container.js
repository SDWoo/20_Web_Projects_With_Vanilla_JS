import { saveLocalItem, getLocalItem } from '../util/localStorage.js';
import Balance from './Balance.js';
import IncomeExpenseContainer from './IncomeExpenseContainer.js';
import List from './List.js';
import Form from './Form.js';

export default class Container {
  constructor($app) {
    this.state = {
      income: 0,
      expense: 0,
      balance: 0,
      transactions: [],
      text: '',
      amount: 0,
    };
    this.$target = document.createElement('div');
    this.$target.className = 'container';
    $app.appendChild(this.$target);

    this.balance = new Balance({
      $container: this.$target,
      initialState: this.state.balance,
    });

    this.incomeExpenseContainer = new IncomeExpenseContainer({
      $container: this.$target,
      initialState: {
        income: this.state.income,
        expense: this.state.expense,
      },
    });

    this.list = new List({
      $container: this.$target,
      initialState: this.state.transactions,
      onClick: (id) => {
        const { balance, income, expense } = this.state;
        console.log(id);
        const idAmount = this.state.transactions[id].amount;
        console.log(idAmount);
        const transactions = this.state.transactions.filter(
          (_, index) => index !== id
        );
        saveLocalItem('transactions', transactions);
        this.setState({
          ...this.state,
          balance: balance - idAmount,
          income: idAmount > 0 ? income - idAmount : income,
          expense: idAmount < 0 ? expense - idAmount : expense,
          transactions,
        });
      },
    });

    this.form = new Form({
      $container: this.$target,
      onSubmit: (text, amount) => {
        const { balance, income, expense } = this.state;
        const transactions = [...this.state.transactions, { text, amount }];
        saveLocalItem('transactions', transactions);
        this.setState({
          ...this.state,
          balance: balance + amount,
          income: amount > 0 ? income + amount : income,
          expense: amount < 0 ? expense + amount : expense,
          transactions,
        });
      },
    });

    this.init();
  }

  setState(nextState) {
    this.state = nextState;
    this.balance.setState(this.state.balance);
    this.incomeExpenseContainer.setState({
      income: this.state.income,
      expense: this.state.expense,
    });
    this.list.setState(this.state.transactions);
  }

  init() {
    const transactions = getLocalItem('transactions') || [];
    let income = 0;
    let expense = 0;
    transactions.forEach((transaction) => {
      const amount = +transaction.amount;
      amount < 0 ? (expense += amount) : (income += amount);
    });

    this.setState({
      ...this.state,
      balance: income + expense,
      income,
      expense,
      transactions,
    });
  }
}
