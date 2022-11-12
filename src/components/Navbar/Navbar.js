import { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from './logo.svg';
import cart from './cart.svg';

class Navbar extends PureComponent {
  render() {
    return (
      <header className={styles.header}>
        <nav>
          <ul className={styles['nav-items']}>
            {this.props.items.map((item) => <li key={item.name}><NavLink to={item.name} className={({ isActive }) => (isActive ? `${styles.active} ${styles['nav-link']}` : `${styles['nav-link']}`)}>{item.name}</NavLink></li>)}
          </ul>
        </nav>
        <div>
          <img src={logo} alt="Cart Logo" />
        </div>
        <div>
          <img src={cart} alt="Cart Icon" />
        </div>
      </header>
    );
  }
}

export default Navbar;
