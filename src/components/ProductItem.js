import { PureComponent } from 'react';
import styles from './ProductItem.module.css';

class ProductItem extends PureComponent {
  render() {
    console.log(this.props);
    const {product} = this.props;
    return (
      <li className={styles.productItem}>
        <img src={product.gallery[0]} alt="Product" className={styles['product-img']} />
        <p className={styles['product-name']}>{product.name}</p>
        <p className={styles['product-price']}>{`${product.prices[0].currency.symbol} ${product.prices[0].amount}`}</p>
      </li>
    );
  }
}

export default ProductItem;
