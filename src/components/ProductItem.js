import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './ProductItem.module.css';
import cartImg from './Navbar/cart.svg';
import { addProduct } from '../store/cartSlice';

class ProductItem extends PureComponent {
  render() {
    const { product, currency, addProduct } = this.props;
    return (
      <li className={styles['product-item']}>
        <Link to={`${product.id}`} className={styles['product-link']}>
          <img src={product.gallery[0]} alt="Product" className={styles['product-img']} />
          <p className={styles['product-name']}>{`${product.brand} ${product.name}`}</p>
          <p className={styles['product-price']}>{`${product.prices[currency.value].currency.symbol} ${product.prices[currency.value].amount}`}</p>
        </Link>
        { product.attributes.length === 0 && (
        <button className={styles.cta} type="button" onClick={() => addProduct(product)}>
          <img src={cartImg} alt="Cart icon" style={{ fill: '#fff' }} />
        </button>
        )}
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
});

export default connect(mapStateToProps, { addProduct })(ProductItem);
