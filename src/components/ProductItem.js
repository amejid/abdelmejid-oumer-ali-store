import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './ProductItem.module.css';

class ProductItem extends PureComponent {
  render() {
    const { product, currency } = this.props;
    return (
      <li className={styles['product-item']}>
        <Link to={`${product.id}`} className={styles['product-link']}>
          <img src={product.gallery[0]} alt="Product" className={styles['product-img']} />
          <p className={styles['product-name']}>{product.name}</p>
          <p className={styles['product-price']}>{`${product.prices[currency.value].currency.symbol} ${product.prices[currency.value].amount}`}</p>
        </Link>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
});

export default connect(mapStateToProps)(ProductItem);
