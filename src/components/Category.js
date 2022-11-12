import { PureComponent } from 'react';
import { gql } from '@apollo/client';
import apolloClient from '../apolloClient';
import styles from './Category.module.css';
import ProductItem from './ProductItem';

const getProductsQuery = gql`
query Category($title: String!){
  category(input: {title: $title}){
    name
    products {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
}
`;

class Category extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      products: [],
    };
  }

  fetchProducts() {
    apolloClient.query({
      query: getProductsQuery,
      variables: {
        title: this.props.name,
      },
    }).then((res) => {
      this.setState({
        isLoaded: true,
        products: res.data.category.products,
      });
    });
  }

  render() {
    const categoryName = this.props.name;
    this.fetchProducts();
    return (
      <div className={styles.container}>
        <h2 className={styles['category-name']}>
          {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
        </h2>
        <ul className={styles['products-list']}>
          {this.state.isLoaded && this.state.products.map((product) => <ProductItem key={product.id} product={product} />)}
        </ul>
      </div>
    );
  }
}

export default Category;
