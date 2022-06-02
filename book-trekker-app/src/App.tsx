import React, { useEffect } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/core/Menu';
import Layout from './components/core/Layout';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchProducts, getProducts, productStatus } from './components/adminResource/product/productSlice';
import ProductCard from './components/user/dashboard/common/ProductCard';

function App() {
  const productsBySell = useAppSelector(getProducts('sold'));
  const productsByArrival = useAppSelector(getProducts('arrival'));
  const { sellStatus, arrivalStatus } = useAppSelector(productStatus);
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (sellStatus === "idle")
      dispatch(fetchProducts('sold'))
    if (arrivalStatus === 'idle')
      dispatch(fetchProducts('createdAt'))
  }, [])



  return (
    <React.Fragment>
      <Menu />
      <Layout
        title="Book TreKKer"
        description="E-Commerce App for web development courses and books." >
      </Layout>

      <ProductCard products={ productsBySell } />

    </React.Fragment>
  );
}

export default App;
