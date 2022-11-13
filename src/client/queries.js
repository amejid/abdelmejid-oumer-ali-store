import { gql } from '@apollo/client';

export const getCategoriesQuery = gql`
query {
  categories {
    name
  }
}
`;

export const getCurrenciesQuery = gql`
query {
  currencies{
    label
    symbol
  }
}
`;

export const getProductsQuery = gql`
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

export const getProductQuery = gql`
query Product($id: String!) {
  product(id: $id) {
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
        id
        displayValue
        value
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
`;
