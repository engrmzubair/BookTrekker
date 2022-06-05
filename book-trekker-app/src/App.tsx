import React, { useEffect } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/core/Menu';
import Layout from './components/core/Layout';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchProducts, getProducts, productStatus } from './components/adminResource/product/productSlice';
import ProductCard from './components/user/dashboard/common/ProductCard';
import { Container } from 'react-bootstrap';
import Search from './components/core/search/Search';

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
      <Search />
      <Container className='my-5'>
        <h1 className='my-4'>New Arrival</h1>
        <ProductCard products={ productsByArrival } />
        <h1 className='my-4'>Best Sellers</h1>
        <ProductCard products={ productsBySell } />
      </Container>


    </React.Fragment >
  );
}

export default App;
