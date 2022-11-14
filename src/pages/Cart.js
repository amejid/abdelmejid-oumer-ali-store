import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css';
import { decrementProduct, incrementProduct } from '../store/cartSlice';
import CartSlider from '../components/CartSlider/CartSlider';

class Cart extends PureComponent {
  render() {
    const {
      cart, currency, incrementProduct, decrementProduct,
    } = this.props;
    let total = 0;

    return (
      <div className={styles.container}>
        <h2 className={styles.heading}>Cart</h2>
        <div className={styles.line} />
        <ul className={styles['products-list']}>
          {cart.products.length > 0 && cart.products.map((prod) => {
            total += (prod.count * prod.prices[currency.value].amount);
            return (
              <li key={prod.cartId} className={styles['product-item']}>
                <div className={styles.left}>
                  <p className={styles['product-brand']}>{prod.brand}</p>
                  <p className={styles['product-name']}>{prod.name}</p>
                  <p className={styles['product-price']}>{`${prod.prices[currency.value].currency.symbol} ${prod.prices[currency.value].amount}`}</p>
                  <ul className={styles['product-attr']}>
                    {prod.attributes.map((attr) => (
                      <li key={attr.id}>
                        <p className={styles['attr-name']}>{`${attr.name}:`}</p>
                        <ul className={styles['attr-list']}>
                          {attr.type === 'text' ? attr.items.map((item) => (item.id === attr.selected.id ? <div className={styles['attr-btn']} style={{ background: 'black', color: 'white' }} key={item.id}>{item.value}</div> : <div className={styles['attr-btn']} key={item.id}>{item.value}</div>)) : attr.items.map((item) => (item.id === attr.selected.id ? <div key={item.id} className={styles['attr-btn-swatch']} style={{ background: item.value, outline: '2px solid orangered' }} aria-labelledby="color-label" /> : <div key={item.id} className={styles['attr-btn-swatch']} style={{ background: item.value }} aria-labelledby="color-label" />))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.right}>
                  <div className={styles.controls}>
                    <button type="button" onClick={() => incrementProduct(prod.cartId)}>+</button>
                    <p className={styles.count}>{prod.count}</p>
                    <button type="button" onClick={() => decrementProduct(prod.cartId)}>-</button>
                  </div>
                  <div className={styles['show-container']}>
                    <CartSlider images={prod.gallery} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className={styles['price-info']}>
          <div>
            <p>Tax 21%:</p>
            <p>Quantity:</p>
            <p>Total:</p>
          </div>
          <div>
            <p className={styles.highlight}>{` ${currency.symbol}${(total * 0.21).toFixed(2)}`}</p>
            <p className={styles.highlight}>{` ${cart.totalCount}`}</p>
            <p className={styles.highlight}>{` ${currency.symbol}${(total + (total * 0.21)).toFixed(2)}`}</p>
          </div>
        </div>
        <div className={styles['cta-section']}>
          <Link to="/" className={styles.cta}>Order</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  currency: state.currency,
});

export default connect(mapStateToProps, { incrementProduct, decrementProduct })(Cart);
