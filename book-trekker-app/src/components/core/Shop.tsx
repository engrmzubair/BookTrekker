import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import Layout from './Layout';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Container } from 'react-bootstrap';
import ProductCard from '../user/dashboard/common/ProductCard';
import { getCategories } from '../adminResource/category/categorySlice';
import ShopCheckBox from './ShopCheckBox';
import { prices } from './fixedPrices';
import ShopRadio from './ShopRadio';
import { getProductsBySearch } from '../adminResource/product/productSlice';
import { fetchProductsBySearch } from './apiCore';

type MyFilters = {
  filters: {
    category: string[],
    price: number[]
  }
}
export type HandleFilters = (filters: any[], filterBy: "category" | "price") => void

function Shop() {

  const categories = useAppSelector(getCategories);
  const filterResults = useAppSelector(getProductsBySearch);

  const dispatch = useAppDispatch()

  const [limit, setLimit] = useState<number>(6);
  const [skip, setSkip] = useState<number>(0);
  const [myFilters, setMyFilters] =
    useState<MyFilters>({

      filters: {
        category: [], price: []
      }
    });

  const handleFilters: HandleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters }

    newFilters.filters[filterBy] = filters;

    setMyFilters(newFilters)

    console.log("Shop: ", myFilters, filterBy);
  }

  useEffect(() => {

    const filters = { ...myFilters.filters }
    const filtersParams = { limit, skip, filters }
    fetchProductsBySearch(filtersParams, dispatch)

  }, [limit, skip, myFilters, dispatch])


  return (
    <React.Fragment>
      <Menu />
      <Layout
        title="Shop Page"
        description="Search books of your choice." >
      </Layout>

      <div className="row ms-4 my-4">

        <div className="col-md-3">
          <h4>Filter by categories</h4>
          <ShopCheckBox
            categories={ categories }
            handleFilters={ handleFilters }
          />
          <h4>Filter by prices</h4>
          <ShopRadio
            prices={ prices }
            handleFilters={ handleFilters }
          />
        </div>
        <div className="col-md-8">
          <Container className='my-4'>
            <ProductCard
              className='col-md-6 my-3 text-center'
              products={ filterResults } />
          </Container>
        </div>
      </div>


    </React.Fragment >
  );
}

export default Shop;
