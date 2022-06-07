import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks'
import { Product } from '../../adminResource/product/productSlice'
import { currentUser } from '../../user/userSlice'
import { getBraintreeClientToken } from '../apiCore';
import DropIn from "braintree-web-drop-in-react"

type Props = {

  products: Product[] | undefined
}

type Data = {
  clientToken: string | null,
  success: boolean,
  instance?: {},
  address?: ''

}

const Checkout = ({ products }: Props) => {


  const user = useAppSelector(currentUser);

  const [data, setData] = useState<Data>({
    success: false,
    clientToken: null,
    instance: {},
    address: ''
  })

  const getToken = async (userId: string) => {

    const res = await getBraintreeClientToken(userId)

    const clientToken = res?.data.clientToken;
    const success = res?.data.success;

    if (clientToken && success)
      setData({ clientToken, success })

  }

  useEffect(() => {
    const userId = user?._id
    userId && getToken(userId)

  }, [user?._id])

  const getTotal = () => {

    if (products)
      return products.reduce((p, n) => {
        if (n && n.count)
          return p + n.count * n.price
        return 1
      }, 0)

  }

  const showDropIn = () => {
    return <div>
      { data.clientToken !== null && products && products.length > 0 && (
        <div>
          <DropIn
            options={ { authorization: data.clientToken } }
            onInstance={ (instance) => (data.instance = instance) }
          />
          <button className='btn btn-success w-100'>Pay</button>
        </div>
      ) }
    </div>
  }

  return (
    <div >
      <h2>Total amount: ${ getTotal() }</h2>

      { user && <div className='w-100 mt-3'>{ showDropIn() }</div> }
      { !user &&

        <Link to="/signin"><button className='btn btn-primary w-100 mt-3'>Signin to checkout</button></Link>

      }
    </div>
  )
}

export default Checkout