import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import PageRoutes from './PageRoutes';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={ store }>
        <PageRoutes />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
