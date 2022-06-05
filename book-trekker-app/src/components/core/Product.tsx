import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchProductById, getProductsById } from '../adminResource/product/productSlice'
import Layout from './Layout'
import Menu from './Menu'

type Props = {}

const Product = (props: Props) => {

  const product = useAppSelector(getProductsById)
  const dispatch = useAppDispatch();
  const { productId } = useParams()

  useEffect(() => {
    if (productId)
      dispatch(fetchProductById(productId))
  }, [productId])

  return (
    <React.Fragment>
      <Menu />
      <Layout
        title={ product?.name }
        description={ product?.description } >
      </Layout>
      {/* <h1>{ product?.name }</h1> */ }

    </React.Fragment >
  )
}

export default Product