import React, { useState, useEffect } from 'react'
import { Row, Container, Table } from 'react-bootstrap';
import { useAppSelector } from '../../../app/hooks';
import { getOrders } from '../../core/apiCore';
import Layout from '../../core/Layout';
import Menu from '../../core/Menu';
import { currentUser } from '../../user/userSlice';
import moment from 'moment'

type Props = {}
type Product = {
  _id: String,
  price: Number,
  count: Number,
  name: String,
  createdAt: String,
  updatedAt: String

}
type OrderType = {
  _id: String,
  products: Product[],
  transaction_id: String,
  amount: Number,
  address: String,
  status: "Not Processed" | "Processing" | "Shipped" | "Delivered" | "Cancelled",
  createdAt: String,
  updatedAt: String,
  user: {
    name: String,
    _id: String,
    email: String
  },
  _v: Number

}[] | [];

const Order = (props: Props) => {

  const [orders, setOrder] = useState<OrderType>([]);
  const user = useAppSelector(currentUser);

  const loadOrders = async () => {

    const userId = user && user._id;

    if (userId) {
      const res = await getOrders(userId);
      console.log(res?.data);
      setOrder(res?.data);
    }
  };


  const noOrders = () => {
    return orders.length < 1 ? <h4>No Orders</h4> : null;
  }

  const showOrdersLength = () => {
    if (orders.length > 0)
      return (
        <h1 className='text-danger display-2 mt-5 mb-1'>
          Total Orders: { orders.length }
        </h1>
      )
    else
      return (
        <h1 className='text-danger display-2 mt-5 mb-1'>
          No Orders
        </h1>
      )
  }

  const showTableRow = (key: string, value: string, useMoment?: boolean) => {
    return (
      <tr>
        <td className='p-3 fs-5 fw-bold'>{ key }</td>

        <td className='p-3 fs-5'>
          { !useMoment ? value : moment(value).fromNow() }
        </td>
      </tr>
    )
  }

  useEffect(() => {
    loadOrders();

  }, [])


  return (

    <React.Fragment>
      <Menu />
      <Layout
        title="Orders"
        description={ `G'day ${user?.name}, You can manage all the orders here.` }
      />

      <Container className='text-center'>
        { showOrdersLength() }

        <Row>
          <div className="col-md-7 mx-auto my-4" >
            { noOrders() }
            { orders.map((o, i) => {
              return (
                <div key={ i } className="mt-5" style={ { borderBottom: "5px solid indigo", color: "white" } }>
                  <h2 className='mb-5'>
                    <div className=' p-2 bg-primary'>
                      Order Id: { o._id }
                    </div>
                  </h2>

                  <Table bordered striped className='text-start'>
                    <tbody>

                      { showTableRow("Status", o.status) }
                      { showTableRow("Transaction Id", `${o.transaction_id}`) }
                      { showTableRow("Amount", `$${o.amount}`) }
                      { showTableRow("Ordered By", `${o.user.name}`) }
                      { showTableRow("Ordered On", `${o.createdAt}`, true) }
                      { showTableRow("Delivery Address", `${o.address}`) }

                    </tbody>
                  </Table>

                  <h3 className="my-4 fst-italic text-start" style={ { color: "brown", } }>
                    Total products in the order: { o.products.length }

                  </h3>

                  { o.products.map((p, i) => {
                    return (
                      <div
                        style={ { border: "1px solid indigo" } }

                      >
                        <Table
                          bordered
                          striped
                          className='text-start table-success'
                        >
                          <tbody>
                            { showTableRow("Product Name", `${p.name}`) }
                            { showTableRow("Product Price", `$${p.price}`) }
                            { showTableRow("Product Total", `${p.count}`) }
                            { showTableRow("Product Id", `${p._id}`) }

                          </tbody>
                        </Table>
                      </div>
                    )
                  }) }

                </div>
              )
            }) }


          </div>
        </Row>
      </Container>
    </React.Fragment >
  )
}

export default Order