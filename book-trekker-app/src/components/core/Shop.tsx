import React, { useEffect } from 'react';
import Menu from './Menu';
import Layout from './Layout';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Container } from 'react-bootstrap';
import ProductCard from '../user/dashboard/common/ProductCard';
import { getCategories } from '../adminResource/category/categorySlice';

function Shop() {

  const categories = useAppSelector(getCategories);


  return (
    <React.Fragment>
      <Menu />
      <Layout
        title="Shop Page"
        description="Search books of your choice." >
      </Layout>

      <div className="row">

        <div className="col-md-4">
          left sidebar
        </div>
        <div className="col-md-8">
          right
        </div>
      </div>


    </React.Fragment >
  );
}

export default Shop;
