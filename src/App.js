import { PureComponent } from 'react';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Category from './components/Category';

const getProductsQuery = gql`
query {
  categories {
    name
  }
}
`;

class App extends PureComponent {
  render() {
    const items = this.props.data;
    return (
      <>
        {!items.loading && <Navbar items={items.categories} />}
        <Routes>
          <Route path="/" element={<Category name="all" />} />
          {!items.loading && items.categories.map((item) => <Route key={item.name} path={`/${item.name}`} element={<Category name={item.name} />} />)}
        </Routes>
      </>
    );
  }
}

export default graphql(getProductsQuery)(App);
