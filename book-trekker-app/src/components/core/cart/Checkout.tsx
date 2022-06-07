import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks'
import { Product } from '../../adminResource/product/productSlice'
import { currentUser } from '../../user/userSlice'
import { getBraintreeClientToken } from '../apiCore';
import DropIn, { IDropInProps } from "braintree-web-drop-in-react"
import { toast } from 'react-toastify';



type Props = {

  products: Product[] | undefined
}

type Data = {
  clientToken?: string | null,
  success?: boolean,
  instance?: any,
  error?: string
  address?: ''

}
// type Instance = {
//   requestPaymentMethod?: () => Promise<any>
//   clearSelectedPaymentMethod?: () => void
// }

const Checkout = ({ products }: Props) => {


  const user = useAppSelector(currentUser);
  // let instance: DropIn;

  const [data, setData] = useState<Data>({
    success: false,
    clientToken: null,
    instance: {},
    error: '',
    address: ''
  })

  const getToken = async (userId: string) => {

    const res = await getBraintreeClientToken(userId)

    const clientToken = res?.data.clientToken;
    const success = res?.data.success;

    console.log("Token status: ", success);

    if (clientToken && success)
      setData({ ...data, clientToken, success })

  }

  useEffect(() => {
    const userId = user?._id
    console.log("userId: ", userId);
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
  const buy = () => {
    //send the nonce to your server
    //nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance.requestPaymentMethod()
      .then((data: any) => {
        console.log(data)
        nonce = data.nonce;

        console.log("send nonce and total to process: ", nonce, getTotal());
      })
      .catch((error: any) => {
        console.log('drop error:', error)
        setData({ ...data, error: error.message })
      })
  }
  if (data.error)
    toast.error(data.error, { theme: "dark" });

  const showDropIn = () => {
    return <div>
      { data.clientToken !== null && products && products.length > 0 && (
        <div>
          <DropIn
            options={ {
              authorization: data.clientToken,
            } }
            onInstance={ (instance) => setData({ ...data, instance }) }
          />
          <button
            className='btn btn-success w-100'
            onClick={ buy }
          >Pay</button>
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