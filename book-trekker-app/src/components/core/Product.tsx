import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchProductById, fetchRelatedProducts, getProductsById, getRelatedProducts } from '../adminResource/product/productSlice'
import SingleProductCard from '../common/SingleProductCard'
import Layout from './Layout'
import Menu from './Menu'

type Props = {}

const Product = (props: Props) => {

  const product = useAppSelector(getProductsById)
  const relatedProducts = useAppSelector(getRelatedProducts)
  const dispatch = useAppDispatch();
  const { productId } = useParams()

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId))
      dispatch(fetchRelatedProducts(productId))
    }
  }, [productId])

  return (
    <React.Fragment>
      <Menu />
      <Layout
        title={ product?.name }
        description={ `${product?.description?.substring(0, 100)} ...` } >
      </Layout>

      <SingleProductCard
        product={ product }
        relatedProducts={ relatedProducts }
      />

    </React.Fragment >
  )
}

export default Product