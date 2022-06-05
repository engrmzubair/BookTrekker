import React from 'react'
import { Card, Col, Container, Row, Table, Badge } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Product } from '../adminResource/product/productSlice'
import ButtonComp from './ButtonComp'
import moment from 'moment'

type Props = { product: Product | undefined }

const SingleProductCard = ({ product }: Props) => {

  console.log(product && product.shipping);
  const showStock = () => {
    if (product && product.quantity > 0)
      return <Badge pill bg='primary' className='p-2'>In Stock</Badge>
    else
      return <Badge pill bg='primary' className='p-2'>Out of Stock</Badge>
  }
  return (
    <Container className='my-5'>
      <Row className="justify-content-md-center">
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
                    <td className='p-3'>{ product?.shipping }</td>
                  </tr>
                </tbody>

              </Table>


              <ButtonComp
                variant="success"
                text="Add to cart"
                className='w-100'
              />

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SingleProductCard