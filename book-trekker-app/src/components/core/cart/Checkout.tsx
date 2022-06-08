import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks'
import { Product } from '../../adminResource/product/productSlice'
import { currentUser } from '../../user/userSlice'
import { getBraintreeClientToken, processPayment } from '../apiCore';
import DropIn from "braintree-web-drop-in-react"
import { toast } from 'react-toastify';



type Props = {

  products: Product[] | undefined
}

type Data = {
  clientToken?: string | null,
  instance?: any,
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
    clientToken: null,
    instance: {},
    address: ''
  })

  const getToken = async (userId: string) => {

    const res = await getBraintreeClientToken(userId)

    const clientToken = res?.data.clientToken;
    const success = res?.data.success;

    if (clientToken && success)
      setData({ ...data, clientToken })

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
  const buy = async () => {
    //send the nonce to your server
    //nonce = data.instance.requestPaymentMethod()
    try {
      const payment = getTotal()
      const { nonce } = await data.instance.requestPaymentMethod();

      const paymentData = { paymentMethodNonce: nonce, payment };

      if (user && user._id) {
        const res = await processPayment(user._id, paymentData);

        if (res && res.data) {

          if (res.data.success)
            toast.success("Thanks! your payment was successful!", { theme: "colored" });

          if (!res.data.success)
            toast.error(res.data.message, { theme: "colored" });
        }
      }


    } catch (error: any) {
      toast.error(error.message, { theme: "colored" });
    }
  }


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