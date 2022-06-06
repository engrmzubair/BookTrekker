import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Product } from '../../adminResource/product/productSlice';
import ProductCard from '../../user/dashboard/common/ProductCard';
import Layout from '../Layout';
import Menu from '../Menu';
import { getCart } from './cartHelpers';

type Props = {}

const Cart = (props: Props) => {

  const [items, setItems] = useState<Product[] | undefined>(undefined);

  useEffect(() => {
    const products = getCart()
    products && setItems(products)
  }, [])

  const showItems = () => {
    return (
      <div
        style={ { marginTop: "5%" } }
      >
        <h2>Your cart has { items?.length } items.</h2>
        <hr />

        <ProductCard
          products={ items }
          addedToCart={ true }
          className="col-md-6 my-3 text-center"
        />
      </div>)
  }

  const noItems = () => {
    return (
      <div
        style={ { marginTop: "5%" } }
      >
        <h2>
          Your cart is empty. <br /><Link to="/shop">
            <small> Continue Shopping.</small>
          </Link>
        </h2>
      </div>
    )
  }

  return (
    <React.Fragment>
      <Menu />

      <Layout
        title='Shopping Cart'
        description='Manage your cart items. Add, remove, checkout or continue shopping.'
      />

      <Container>
        <Row>
          <div className='col-md-8'>
            { items && items.length > 0 ? showItems() : noItems() }

          </div>
        </Row>


      </Container>
    </React.Fragment>
  )
}

export default Cart