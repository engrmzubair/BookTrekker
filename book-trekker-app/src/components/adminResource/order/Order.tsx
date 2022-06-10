import React, { useState, useEffect } from 'react'
import { Row, Container, Table, Form } from 'react-bootstrap';
import { useAppSelector } from '../../../app/hooks';
import { getOrders, getStatusValues, updateStatus } from '../../core/apiCore';
import Layout from '../../core/Layout';
import Menu from '../../core/Menu';
import { currentUser } from '../../user/userSlice';
import moment from 'moment'

type Props = {}

type Product = {
  _id: string,
  price: number,
  count: number,
  name: string,
  createdAt: string,
  updatedAt: string

}

type FetchStatus = string[];

type Order = {
  _id: string,
  products: Product[],
  transaction_id: string,
  amount: number,
  address: string,
  status: "Not Processed" | "Processing" | "Shipped" | "Delivered" | "Cancelled",
  createdAt: string,
  updatedAt: string,
  user: {
    name: string,
    _id: string,
    email: string
  },
  _v: number

}

type OrderType = Order[] | [];

const Order = (props: Props) => {

  const [orders, setOrder] = useState<OrderType>([]);
  const [statusValues, setStatusValues] = useState<FetchStatus>([]);
  const user = useAppSelector(currentUser);

  const loadOrders = async () => {

    const userId = user && user._id;

    if (userId) {
      try {
        const res = await getOrders(userId);
        res?.data.length && setOrder(res?.data);
      } catch (error) {

      }
    }
  };
  const loadStatus = async () => {

    const userId = user && user._id;

    if (userId) {
      try {
        const res = await getStatusValues(userId);
        res?.data.length && setStatusValues(res?.data);
      } catch (error) {

      }
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

  const handleStatusChange = async (status: string, orderId: string) => {

    try {
      const res = user && await updateStatus(orderId, user._id, status)
      if (res) {
        console.log(res.data);
        loadOrders()

      }
    } catch (error) {

    }

    console.log('Status changed ', status)
  }

  const showStatus = (o: Order) => {
    return (
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <h3 className='mark mb-3 fs-4'>{ o.status }</h3>
        <Form.Select
          onChange={ e => handleStatusChange(e.target.value, o._id) }>
          <option value="">Update Status...</option>

          {
            statusValues.map((s, i) => {
              return (
                <option
                  value={ s }
                  key={ i }
                >
                  { s }
                </option>
              )
            })
          }
        </Form.Select>

      </Form.Group>)
  }

  useEffect(() => {
    loadOrders();
    loadStatus()

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

                      <tr>
                        <td className='p-3 fs-5 fw-bold'>Status</td>

                        <td className='p-3 fs-5'>

                          { showStatus(o) }
                        </td>
                      </tr>

                      {/* { showTableRow("Status", o.status) } */ }
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
                        key={ i }
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