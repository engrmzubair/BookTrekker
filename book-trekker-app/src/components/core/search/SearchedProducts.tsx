import React from 'react'
import { Container } from 'react-bootstrap';
import { Product } from '../../adminResource/product/productSlice';
import ProductCard from '../../user/dashboard/common/ProductCard';

type Props = {
  products: Product[] | undefined;
  searched: boolean;
}

const SearchedProducts = ({ products, searched }: Props) => {

  const searchMessage = () => {
    const length = products?.length;
    if (searched && products && products.length > 0) {
      return `Found ${products.length} ${length === 1 ? "product" : "products"}`;
    }
    if (searched && products && products.length < 1) {
      return `No products found`;
    }
  }

  return (

    <React.Fragment>
      <h2 className="mt-4 mb-4">
        { searchMessage() }
      </h2>
      <ProductCard products={ products } />

    </React.Fragment>

  )
}

export default SearchedProducts