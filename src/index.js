import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import apolloClient from './apolloClient';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
);
