import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import PageRoutes from './PageRoutes';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(

  <BrowserRouter>
    <Provider store={ store }>
      <PageRoutes />
    </Provider>
  </BrowserRouter>

);
