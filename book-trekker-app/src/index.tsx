import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import PageRoutes from './PageRoutes';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
//...
let persistor = persistStore(store);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(

  <BrowserRouter>
    <Provider store={ store }>
      <PersistGate persistor={ persistor }>
        <PageRoutes />
      </PersistGate>
    </Provider>
  </BrowserRouter>

);
