import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Product } from '../../adminResource/product/productSlice';
import ProductCard from '../../user/dashboard/common/ProductCard';
import Layout from '../Layout';
import Menu from '../Menu';
import { getCart } from './cartHelpers';
import Checkout from './Checkout';

type Props = {}

const Cart = (props: Props) => {

  const [items, setItems] = useState<Product[] | undefined>(undefined);
  const [count, setCount] = useState<number>(1);
  const [length, setLength] = useState<number>(1);


  useEffect(() => {

    setItems(getCart)

  }, [count, length])

  const showItems = () => {
    return (
      <div
        style={ { marginTop: "2.5rem" } }
      >
        <h2>Your cart has { items?.length } items.</h2>
        <hr />

        <ProductCard
          products={ items }
          addedToCart={ true }
          className="col-md-6 my-3 text-center"
          setCount={ setCount }
          setLength={ setLength }
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


          <div className="col-md-4">
            <div
              style={ { marginTop: "2.5rem" } }
            >
              <h2>Your cart Summary</h2>
              <hr />

              <Checkout
                products={ items }
              />

            </div>
          </div>

        </Row>


      </Container>
    </React.Fragment>
  )
}

export default Cart