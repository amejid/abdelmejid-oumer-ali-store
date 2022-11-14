import { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Navbar.module.css';
import logo from './logo.svg';
import cart from './cart.svg';
import arrowDown from './arrow-down.svg';
import arrowUp from './arrow-up.svg';
import apolloClient from '../../client';
import { setCurrency } from '../../store/currencySlice';
import { getCurrenciesQuery } from '../../client/queries';
import CartModal from '../CartModal';

class Navbar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      currencies: [],
      switcherOpen: false,
      cartOpen: false,
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

  changeCurrency(currency) {
    const { setCurrency } = this.props;
    setCurrency(currency);
    this.setState({
      switcherOpen: false,
    });
  }

  closeModal() {
    this.setState({ cartOpen: false });
  }

  render() {
    const { items, currency, totalCount } = this.props;
    const {
      isLoaded, currencies, switcherOpen, cartOpen,
    } = this.state;
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
          {switcherOpen && <div aria-hidden="true" className={styles['dropdown-backdrop']} onClick={() => this.setState({ switcherOpen: false })} />}
          {cartOpen && <div aria-hidden="true" className={styles['cart-backdrop']} onClick={() => this.closeModal()} />}
          <div className={styles.dropdown}>
            <button className={styles.dropbtn} onClick={() => this.setState({ switcherOpen: true })} type="button">
              <span>{currency.symbol}</span>
              {!switcherOpen && <img src={arrowDown} alt="Arrow Down" />}
              {switcherOpen && <img src={arrowUp} alt="Arrow Down" />}
            </button>
            {switcherOpen && (
            <div className={styles['dropdown-content']}>
              {isLoaded && currencies.map((curr, index) => (
                <button key={curr.label} type="button" style={{ backgroundColor: `${currency.value === index ? '#f1f1f1' : '#fff'}` }} onClick={() => this.changeCurrency({ label: curr.label, symbol: curr.symbol, value: index })}>
                  <span>{curr.symbol}</span>
                  &nbsp;
                  {curr.label}
                </button>
              ))}
            </div>
            )}
          </div>
          <div className={styles['cart-dropdown']}>
            <button className={styles['cart-dropbtn']} onClick={() => this.setState({ cartOpen: true })} type="button">
              <img src={cart} alt="Cart Icon" />
              <span className={`${styles.badge} ${styles.lblCartCount}`}>{totalCount}</span>
            </button>
            {cartOpen && (
              <div className={styles['cart-content']}>
                <CartModal closeModal={this.closeModal} />
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
  totalCount: state.cart.totalCount,
});

export default connect(mapStateToProps, { setCurrency })(Navbar);
