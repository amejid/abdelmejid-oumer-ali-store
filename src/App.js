import { PureComponent } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Category from './components/Category';
import Product from './components/Product';
import { getCategoriesQuery } from './client/queries';

class App extends PureComponent {
  render() {
    const { data: items } = this.props;
    return (
      <>
        {!items.loading && <Navbar items={items.categories} />}
        <Routes>
          <Route path="/" element={<Navigate to="/all" />} />
          {!items.loading && items.categories.map((item) => <Route key={item.name} path={`/${item.name}`} element={<Category name={item.name} />} />)}
          <Route path="/:categoryName/:productId" element={<Product />} />
        </Routes>
      </>
    );
  }
}

export default graphql(getCategoriesQuery)(App);
