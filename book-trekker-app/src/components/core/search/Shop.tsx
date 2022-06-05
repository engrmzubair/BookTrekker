import React, { useEffect, useState } from 'react';
import Menu from '../Menu';
import Layout from '../Layout';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Button, Container } from 'react-bootstrap';
import ProductCard from '../../user/dashboard/common/ProductCard';
import { getCategories } from '../../adminResource/category/categorySlice';
import ShopCheckBox from './ShopCheckBox';
import { prices } from '../fixedPrices';
import ShopRadio from './ShopRadio';
import { addProductsBySearch, getProductsBySearch } from '../../adminResource/product/productSlice';
import { fetchProductsBySearch } from '../apiCore';

export type Filter = {
  category: string[],
  price: number[]
}
type MyFilters = {
  filters: Filter
}
export type HandleFilters = (filters: any[], filterBy: "category" | "price") => void

function Shop() {

  const categories = useAppSelector(getCategories);
  const filterResults = useAppSelector(getProductsBySearch);

  const dispatch = useAppDispatch()

  const [limit] = useState<number>(6);
  const [size, setSize] = useState<number>(0);
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

  const loadFilteredResult = async (filters: Filter) => {
    const { data } = await fetchProductsBySearch(limit, skip, filters);

    dispatch(addProductsBySearch(data.data))
    setSize(data.size);
  }


  const loadMore = async () => {
    const filters = { ...myFilters.filters };

    const toSkip = skip + limit;

    try {
      const { data } = await fetchProductsBySearch(limit, toSkip, filters);

      const newProducts = filterResults?.concat(data.data);
      const newSize = newProducts?.length;

      if (newSize) {
        setSize(newSize);
        setSkip(toSkip)
      }

      newProducts && dispatch(addProductsBySearch(newProducts));

    } catch (ex) {

    }
  }


  useEffect(() => {

    const filters = { ...myFilters.filters };
    loadFilteredResult(filters)

  }, [myFilters])

  return (
    <React.Fragment>
      <Menu />
      <Layout
        title="Shop Page"
        description="Search books of your choice." >
      </Layout>


      <div className="row ms-4 my-4">

        <div className="col-md-3 mt-4">
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
          <Container className='my-3 text-center'>
            <ProductCard
              className='col-md-6 my-3 text-center'
              products={ filterResults } />

            { size > 0 && size >= limit && <Button
              className='mt-3'
              variant="primary"
              onClick={ loadMore }
            >
              Load More
            </Button> }

          </Container>
        </div>
      </div>


    </React.Fragment >
  );
}

export default Shop;
