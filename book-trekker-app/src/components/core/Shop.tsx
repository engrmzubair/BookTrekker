import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import Layout from './Layout';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Container } from 'react-bootstrap';
import ProductCard from '../user/dashboard/common/ProductCard';
import { getCategories } from '../adminResource/category/categorySlice';
import ShopCheckBox from './ShopCheckBox';

type MyFilters = {
  filters: {
    categories: string[],
    price: string[]
  }
}
export type HandleFilters = (filters: string[], filterBy: "categories" | "price") => void

function Shop() {

  const categories = useAppSelector(getCategories);
  const [myFilters, setMyFilters] = useState<MyFilters>({
    filters: {
      categories: [], price: []
    }
  })

  const handleFilters: HandleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters }

    newFilters.filters[filterBy] = filters;

    setMyFilters(newFilters)

    console.log("Shop: ", myFilters, filterBy);
  }


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
            handleFilters={ handleFilters }
          />
        </div>
        <div className="col-md-8">
          { JSON.stringify(myFilters) }
        </div>
      </div>


    </React.Fragment >
  );
}

export default Shop;
