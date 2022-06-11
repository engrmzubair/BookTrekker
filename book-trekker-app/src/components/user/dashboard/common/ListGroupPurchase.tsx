import moment from 'moment';
import React from 'react'
import { Accordion, ListGroup } from 'react-bootstrap';
import { Order } from '../../userSlice';


type Props = {
  items: Order[] | undefined,
  variant?: string,
  href?: string,
  className?: string,
}

const ListGroupPurchase = ({
  items, variant = 'light', className = 'm-4'
}
  : Props) => {

  const showListItems = (key: string, value: string | number, useMoment?: boolean) => {
    return (
      <ListGroup.Item>
        <span
          style={ { fontWeight: "bolder", marginRight: "0.5%" } }
        >
          { key }
        </span>
        <span>{ !useMoment ? value : moment(value).fromNow() } </span>
      </ListGroup.Item>
    )
  }

  console.log("items", items);

  if (!items?.length)
    return null

  return (
    <React.Fragment>
      <div className={ className }>

        { items.map((order, i) => <ListGroup
          key={ i }
          className='mb-3 bg-light text-dark p-2'
          style={ { border: "5px solid yellow" } }
        >
          <span
            className='fs-5 text-center my-1 text-success py-1'
            style={ { fontWeight: "bolder" } }
          >
            Order: { i + 1 }
          </span>

          { showListItems("Order Status: ", `${order.status}`) }
          { showListItems("Total Amount: ", `$${order.amount}`) }
          { showListItems("Delivery Address: ", `${order.address}`) }
          { showListItems("Ordered on: ", `${order.createdAt}`, true) }

          <Accordion>
            <Accordion.Item eventKey={ `${i}` }>
              <Accordion.Header>
                <span style={ { fontWeight: "bolder" } }>Products</span>
              </Accordion.Header>

              <Accordion.Body>
                <ListGroup.Item
                  className='px-5 py-3'
                >
                  { order.products.map((p, i) =>
                    <ListGroup>
                      <span
                        className='fs-3 my-3 text-center ps-3 bg-info p-1'>
                        Product: { i + 1 }
                      </span>

                      { showListItems("Product Name: ", p.name) }
                      { showListItems("Product Price: ", `$${p.price}`) }
                      { showListItems("Product Quantity: ", p.count) }

                    </ListGroup>
                  )

                  }
                </ListGroup.Item>

              </Accordion.Body>




            </Accordion.Item>
          </Accordion>


        </ListGroup>
        ) }

      </div>
    </React.Fragment >
  )
}

export default ListGroupPurchase