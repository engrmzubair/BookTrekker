import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Card, Table } from 'react-bootstrap';
import { Product } from '../../../adminResource/product/productSlice';
import { addItem, updateItem, removeItem, itemTotal } from '../../../core/cart/cartHelpers';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

type Props = {
  products: Product[] | undefined;
  className?: string,
  addedToCart?: boolean;
  count?: number;
  setCount?: React.Dispatch<React.SetStateAction<number>>;
  setLength?: React.Dispatch<React.SetStateAction<number>>;
}

const ProductCard = ({
  products,
  addedToCart,
  count,
  setCount,
  setLength,
  className = 'col-lg-4 col-md-6 col-xl-4 my-3 text-center' }: Props) => {

  const navigate = useNavigate()

  const addToCart = (p: Product) => {
    addItem(p, handleRedirect)
  }
  const removeFromCart = (p: Product) => {

    removeItem(p._id);

    setLength && setLength(itemTotal())
    console.log(`Remove item ${p.name}`);
    toast.info(`Item ${p.name} removed from cart.`, { theme: 'dark' })
  }

  const handleRedirect = () => {
    navigate('/cart')
  }

  const handleChange = (id: string, value: number) => {

    setCount && setCount(value < 1 ? 1 : value)

    if (value >= 1)
      updateItem(id, value)
  }

  return (
    <React.Fragment>

      <ToastContainer />
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

                <Table bordered >
                  <tbody>
                    <tr>
                      <td className='p-1 fw-bold'>Price</td>
                      <td className='p-1'>{ `$${p?.price}` }</td>
                    </tr>
                    { !addedToCart && <tr>
                      <td className='p-1 fw-bold'>Category</td>
                      <td className='p-1'>{ p?.category?.name }</td>
                    </tr> }
                    { addedToCart && <tr>
                      <td className='p-1 fw-bold'>Quantity</td>
                      <td className='p-1'>{ p.count }</td>
                    </tr> }
                  </tbody>
                </Table>

                { addedToCart && <div className="input-group my-3">
                  <span className="input-group-text bg-light">Adjust Quantity</span>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={ count }
                    onChange={ (e) => handleChange(p._id, parseInt(e.target.value)) }
                  />
                </div> }

                <NavLink
                  className="nav-link mb-3 btn btn-info p-1"
                  style={ { color: "white" } }
                  to={ `/product/${p._id}` }>
                  View Course
                </NavLink>

                { !addedToCart && <Button
                  variant="success"
                  className="w-100"
                  onClick={ () => addToCart(p) }

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