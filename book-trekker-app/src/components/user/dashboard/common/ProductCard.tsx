import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap';
import { Product } from '../../../adminResource/product/productSlice';
import { addItem } from '../../../core/cart/cartHelpers';
import { useNavigate } from 'react-router-dom';

type Props = {
  products: Product[] | undefined;
  className?: string,
  addedToCart?: boolean;
}

const ProductCard = ({
  products,
  addedToCart,
  className = 'col-lg-4 col-md-6 col-xl-4 my-3 text-center' }: Props) => {


  const navigate = useNavigate()

  const addToCart = (p: Product) => {
    addItem(p, handleRedirect)
  }
  const removeFromCart = (p: Product) => {
    console.log(p?.name);
  }

  const handleRedirect = () => {
    navigate('/cart')
  }

  return (
    <React.Fragment>
      <div className='row'>
        { products?.map((p, i) => (
          <div key={ i } className={ className } >
            <Card
              className="h-100">
              <Card.Img
                variant="top"
                className='card-img-top mt-3'
                src={ p.photo.url } />
              <Card.Body>
                <Card.Title
                  style={ { height: "4.5rem" } }
                  className=" headerBackground p-3 my-3"
                >{ p.name }</Card.Title>
                <Card.Text style={ { height: "11rem" } }>
                  { p.description.substring(0, 230) } ...
                </Card.Text>
                <Card.Text className="text-muted mb-0">
                  Category: { p.category.name }
                </Card.Text>
                <Card.Text className="text-muted mb-0">
                  Price: { p.price }
                </Card.Text>

                <NavLink className="nav-link" to={ `/product/${p._id}` }>
                  View Course
                </NavLink>

                { !addedToCart && <Button
                  variant="success"
                  className="w-100"
                  onClick={ (e) => addToCart(p) }

                >Add to cart
                </Button> }

                { addedToCart && <Button
                  variant="success"
                  className="w-100"
                  onClick={ (e) => removeFromCart(p) }

                >Remove from cart
                </Button> }

              </Card.Body>
            </Card>
          </div>
        )
        ) }
      </div>
    </React.Fragment >
  )
}

export default ProductCard