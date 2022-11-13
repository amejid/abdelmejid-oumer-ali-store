import { PureComponent } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import parse from 'html-react-parser';
import apolloClient from '../client';
import { getProductQuery } from '../client/queries';
import { addProduct } from '../store/cartSlice';
import styles from './Product.module.css';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      product: null,
      defaultImg: null,
    };
  }

  componentDidMount() {
    const setDefaultAttributes = (product) => {
      const newPro = JSON.parse(JSON.stringify(product));
      if (newPro.attributes.length > 0) {
        newPro.attributes.forEach((attr) => {
          // eslint-disable-next-line prefer-destructuring
          attr.selected = attr.items[0];
        });
      }
      return newPro;
    };

    const { params: { productId } } = this.props;
    apolloClient.query({
      query: getProductQuery,
      variables: {
        id: productId,
      },
    }).then((res) => {
      this.setState({
        isLoaded: true,
        product: setDefaultAttributes(res.data.product),
        defaultImg: res.data.product.gallery[0],
      });
    });
  }

  updateSelectedAttribute(attrId, itemIndex) {
    this.setState((prevState) => ({
      ...prevState,
      product: {
        ...prevState.product,
        attributes: prevState.product.attributes.map((attr) => {
          if (attr.id === attrId) {
            attr.selected = attr.items[itemIndex];
          }
          return attr;
        }),
      },
    }));
  }

  render() {
    const { product, defaultImg, isLoaded } = this.state;
    const { currency, addProduct } = this.props;
    return (
      <div className={styles['product-container']}>
        <div className={styles.gallery}>
          <ul className={styles['mini-gallery']}>
            {isLoaded && product.gallery.map((image) => <li key={image}><button type="button" onClick={() => this.setState({ defaultImg: image })}><img className={styles['mini-img']} src={image} alt="Product view" /></button></li>)}
          </ul>
          {isLoaded && <img src={defaultImg} alt="Large view" className={styles['full-img']} />}
        </div>
        {isLoaded && (
        <div>
          <p className={styles['product-name']}>{product.brand}</p>
          <p className={styles['product-brand']}>{product.name}</p>
          <ul className={styles['product-attr']}>
            {product.attributes.map((attr) => (
              <li key={attr.id}>
                <p className={styles['attr-name']}>{`${attr.name}:`}</p>
                <ul className={styles['attr-list']}>
                  {attr.type === 'text' ? attr.items.map((item, index) => (item.id === attr.selected.id ? <button onClick={() => this.updateSelectedAttribute(attr.id, index)} className={styles['attr-btn']} style={{ background: 'black', color: 'white' }} key={item.id} type="button">{item.value}</button> : <button onClick={() => this.updateSelectedAttribute(attr.id, index)} className={styles['attr-btn']} key={item.id} type="button">{item.value}</button>)) : attr.items.map((item, index) => (item.id === attr.selected.id ? <button onClick={() => this.updateSelectedAttribute(attr.id, index)} key={item.id} type="button" className={styles['attr-btn-swatch']} style={{ background: item.value, outline: '2px solid orangered' }} aria-labelledby="color-label" /> : <button onClick={() => this.updateSelectedAttribute(attr.id, index)} key={item.id} type="button" className={styles['attr-btn-swatch']} style={{ background: item.value }} aria-labelledby="color-label" />))}
                </ul>
              </li>
            ))}
          </ul>
          <p className={styles['product-price-label']}>Price:</p>
          <p className={styles['product-price']}>{`${product.prices[currency.value].currency.symbol} ${product.prices[currency.value].amount}`}</p>
          <button onClick={() => addProduct(product)} type="button" className={styles.cta}>Add to cart</button>
          {parse(product.description)}
        </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
});

export default withParams(connect(mapStateToProps, { addProduct })(Product));
