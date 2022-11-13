import { PureComponent } from 'react';
import { gql } from '@apollo/client';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Navbar.module.css';
import logo from './logo.svg';
import cart from './cart.svg';
import arrowDown from './arrow-down.svg';
import apolloClient from '../../client';
import { setCurrency } from '../../store';

const getCurrenciesQuery = gql`
query {
  currencies{
    label
    symbol
  }
}
`;

class Navbar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      currencies: [],
    };
  }

  componentDidMount() {
    apolloClient.query({
      query: getCurrenciesQuery,
    }).then((res) => {
      this.setState({
        isLoaded: true,
        currencies: res.data.currencies,
      });
    });
  }

  render() {
    const { items, currency, setCurrency } = this.props;
    const { isLoaded, currencies } = this.state;
    return (
      <header className={styles.header}>
        <nav>
          <ul className={styles['nav-items']}>
            {items.map((item) => <li key={item.name}><NavLink to={item.name} className={({ isActive }) => (isActive ? `${styles.active} ${styles['nav-link']}` : `${styles['nav-link']}`)}>{item.name}</NavLink></li>)}
          </ul>
        </nav>
        <div>
          <img src={logo} alt="Cart Logo" />
        </div>
        <div className={styles['cart-container']}>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn} type="button">
              <span>{currency.symbol}</span>
              <img src={arrowDown} alt="Arrow Down" />
            </button>
            <div className={styles['dropdown-content']}>
              {isLoaded && currencies.map((currency, index) => (
                <button key={currency.label} type="button" onClick={() => setCurrency({ label: currency.label, symbol: currency.symbol, value: index })}>
                  <span>{currency.symbol}</span>
                  &nbsp;
                  {currency.label}
                </button>
              ))}
            </div>
          </div>
          <img src={cart} alt="Cart Icon" />
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
});

export default connect(mapStateToProps, { setCurrency })(Navbar);
