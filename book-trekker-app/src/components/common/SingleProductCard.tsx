import React from 'react'
import { Card, Col, Container, Row, Table, Badge, ListGroup, Button } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { Product } from '../adminResource/product/productSlice'
import moment from 'moment'
import { addItem } from '../core/cart/cartHelpers'

type Props = {
  product: Product | undefined,
  relatedProducts: Product[] | undefined
}

const SingleProductCard = ({ product, relatedProducts }: Props) => {

  const navigate = useNavigate()

  const addToCart = (p: Product) => {
    addItem(p, handleRedirect)
  }

  const handleRedirect = () => {
    navigate('../../cart')
  }

  const showStock = () => {
    if (product && product.quantity > 0)
      return <Badge pill bg='primary' className='p-2'>In Stock</Badge>
    else
      return <Badge pill bg='primary' className='p-2'>Out of Stock</Badge>
  }

  const showShipping = () => {

    if (product && product.shipping)
      return 'Yes'
    else
      return "No"
  }

  return (
    <Container className='my-5'>
      <Row className="justify-content-md-start">
        <Col md={ 8 }>
          <Card
          // className="h-100"
          >
            <Card.Img
              variant="top"
              className='card-img-top mt-3'
              src={ product?.photo.url } />
            <Card.Body>
              <Card.Title
                style={ { height: "3.5rem" } }
                className="my-2 p-3 mb-3 headerBackground"
              >{ product?.name }
              </Card.Title>

              <Table bordered striped className='table-success'>

                <tbody>
                  <tr>
                    <td className='p-3'>Description</td>
                    <td className='p-3'>{ product?.description }</td>
                  </tr>
                  <tr>
                    <td className='p-3'>Price</td>
                    <td className='p-3'>{ `$${product?.price}` }</td>
                  </tr>
                  <tr>
                    <td className='p-3'>Category</td>
                    <td className='p-3'>{ product?.category?.name }</td>
                  </tr>
                  <tr>
                    <td className='p-3'>Sold</td>
                    <td className='p-3'>{ product?.sold }</td>
                  </tr>
                  <tr>
                    <td className='p-3'>Added on</td>
                    <td className='p-3'>{ moment(product?.createdAt).fromNow() }</td>
                  </tr>
                  <tr>
                    <td className='p-3'>Stock</td>
                    <td className='p-3'>{ showStock() }</td>
                  </tr>
                  <tr>
                    <td className='p-3'>Shipping</td>
                    <td className='p-3'>{ showShipping() }</td>
                  </tr>
                </tbody>

              </Table>

              <Button
                variant="success"
                className="w-100"
                onClick={ () => { product && addToCart(product) } }

              >Add to cart
              </Button>

            </Card.Body>
          </Card>
        </Col>
        <Col md={ 4 }>

          <h4>Related Courses</h4>

          <ListGroup>

            { relatedProducts?.map((p, i) => <ListGroup.Item

              key={ i }
              action>

              <NavLink
                className="nav-link"
                to={ `/product/${p._id}` }>
                { p.name }
              </NavLink>

            </ListGroup.Item>

            ) }

          </ListGroup>



        </Col>
      </Row>
    </Container>
  )
}

export default SingleProductCard