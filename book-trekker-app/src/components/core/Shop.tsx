import React, { useEffect } from 'react';
import Menu from './Menu';
import Layout from './Layout';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Container } from 'react-bootstrap';
import ProductCard from '../user/dashboard/common/ProductCard';
import { getCategories } from '../adminResource/category/categorySlice';
import ShopCheckBox from './ShopCheckBox';

function Shop() {

  const categories = useAppSelector(getCategories);


  return (
    <React.Fragment>
      <Menu />
      <Layout
        title="Shop Page"
        description="Search books of your choice." >
      </Layout>

      <div className="row m-4">

        <div className="col-md-4">
          <h4>Filter by categories</h4>
          <ShopCheckBox
            categories={ categories }
          />
        </div>
        <div className="col-md-8">
          right
        </div>
      </div>


    </React.Fragment >
  );
}

export default Shop;
