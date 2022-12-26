import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './ProductItem.module.css';
import cartImg from './cart.svg';
import { addProduct } from '../../store/cartSlice';

class ProductItem extends PureComponent {
  render() {
    const { product, currency, addProduct } = this.props;
    return (
      <li className={styles['product-item']}>
        {!product.inStock && (
          <Link to={`${product.id}`} className={styles['out-stock']}>
            <span className={styles['out-stock-text']}>Out of stock</span>
          </Link>
        ) }
        <Link to={`${product.id}`} className={styles['product-link']}>
          <div className={styles['product-img-container']}>
            <img src={product.gallery[0]} alt="Product" className={styles['product-img']} />
          </div>
          <p className={styles['product-name']}>{`${product.brand} ${product.name}`}</p>
          <p className={styles['product-price']}>{`${product.prices[currency.value].currency.symbol}${product.prices[currency.value].amount}`}</p>
        </Link>
        {product.inStock && product.attributes.length === 0 && (
        <button className={styles.cta} type="button" onClick={() => addProduct(product)}>
          <img src={cartImg} alt="Cart icon" />
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
