import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useAppSelector } from '../../../app/hooks';
import { getOrders } from '../../core/apiCore';
import Layout from '../../core/Layout';
import { currentUser } from '../../user/userSlice';

type Props = {}
type Product = {
  _id: String,
  price: Number,
  count: Number,
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

  useEffect(() => {
    loadOrders();

  }, [])


  return (

    <React.Fragment>

      <Layout
        title="Orders"
        description={ `G'day ${user?.name}, You can manage all the orders here.` }
      />

      <Row>
        <div className="col-md-8 offset-md-2 my-4" >
          { noOrders() }
          { JSON.stringify(orders) }
        </div>
      </Row>
    </React.Fragment>
  )
}

export default Order