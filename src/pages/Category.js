import { PureComponent } from 'react';
import apolloClient from '../client';
import styles from './Category.module.css';
import ProductItem from '../components/ProductItem/ProductItem';
import { getProductsQuery } from '../client/queries';

class Category extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      products: [],
    };
  }

  fetchProducts() {
    const { name } = this.props;
    apolloClient.query({
      query: getProductsQuery,
      variables: {
        title: name,
      },
    }).then((res) => {
      this.setState({
        isLoaded: true,
        products: res.data.category.products,
      });
    });
  }

  render() {
    const { name: categoryName } = this.props;
    this.fetchProducts();
    const { products, isLoaded } = this.state;
    return (
      <div className={styles.container}>
        <h2 className={styles['category-name']}>
          {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
        </h2>
        <ul className={styles['products-list']}>{isLoaded && products.map((product) => <ProductItem key={product.id} product={product} />)}</ul>
      </div>
    );
  }
}

export default Category;
