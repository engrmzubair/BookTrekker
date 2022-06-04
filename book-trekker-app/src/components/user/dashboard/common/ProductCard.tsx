import React from 'react'
import { NavLink } from 'react-router-dom'
import { Card } from 'react-bootstrap';
import { Product } from '../../../adminResource/product/productSlice';
import ButtonComp from '../../../common/ButtonComp';

type Props = {
  products: Product[] | undefined;
  className?: string
}

const ProductCard = ({ products, className = 'col-lg-4 col-md-6 col-xl-4 my-3 text-center' }: Props) => {


  return (
    <React.Fragment>
      <div className='row'>


        { products?.map((p, i) => (
          <div key={ i } className={ className } >
            <Card
              className="h-100">
              <Card.Img
                variant="top"
                className='card-img-top'
                src={ p.photo.url } />
              <Card.Body>
                <Card.Title
                  style={ { height: "3rem" } }>{ p.name }</Card.Title>
                <Card.Text style={ { height: "11rem" } }>
                  { p.description.substring(0, 230) } ...
                </Card.Text>
                <Card.Text className="text-muted mb-0">
                  Category: { p.category.name }
                </Card.Text>
                <Card.Text className="text-muted mb-0">
                  Price: { p.price }
                </Card.Text>

                <NavLink className="nav-link" to="/">
                  View Product
                </NavLink>

                <ButtonComp
                  variant="success"
                  text="Add to cart"
                  className='w-100'
                />

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