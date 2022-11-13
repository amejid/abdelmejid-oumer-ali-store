import { PureComponent } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Category from './pages/Category';
import Product from './pages/Product';
import { getCategoriesQuery } from './client/queries';
import Cart from './pages/Cart';

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
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </>
    );
  }
}

export default graphql(getCategoriesQuery)(App);
