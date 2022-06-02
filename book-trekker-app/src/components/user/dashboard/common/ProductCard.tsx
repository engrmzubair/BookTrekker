import React from 'react'
import { Card, Button, Container } from 'react-bootstrap';
import { Product } from '../../../adminResource/product/productSlice';

type Props = {
  products: Product[] | undefined;
}

const ProductCard = ({ products }: Props) => {


  return (
    <React.Fragment>
      <Container>
        <div className='row'>


          { products?.map((p, i) => (
            <div className='col-sm-4 my-3 text-center' >
              <Card key={ i } className="h-100">
                <Card.Img variant="top" className='card-img-top'
                  src={ p.photo.url } />
                <Card.Body>
                  <Card.Title>{ p.name }</Card.Title>
                  <Card.Text>
                    { p.description }
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </div>
          )
          ) }
        </div>
      </Container>
    </React.Fragment >
  )
}

export default ProductCard