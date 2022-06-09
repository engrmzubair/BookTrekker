import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks'
import { Product } from '../../adminResource/product/productSlice'
import { currentUser } from '../../user/userSlice'
import { getBraintreeClientToken, processPayment, createOrder } from '../apiCore';
import DropIn from "braintree-web-drop-in-react"
import { toast } from 'react-toastify';
import { emptyCart, itemTotal } from './cartHelpers'
import PropagateLoader from "react-spinners/PropagateLoader";



type Props = {

  products: Product[] | undefined,
  setLength: React.Dispatch<React.SetStateAction<number>>
}

type Data = {
  clientToken?: string | null,
  instance?: any,
  address?: string,

}

const Checkout = ({ products, setLength }: Props) => {

  const user = useAppSelector(currentUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#417505");

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
    setLoading(true)
    //send the nonce to your server
    //nonce = data.instance.requestPaymentMethod()
    try {
      const payment = getTotal()
      const { nonce } = await data.instance.requestPaymentMethod();

      const paymentData = { paymentMethodNonce: nonce, payment };

      if (user && user._id) {
        const res = await processPayment(user._id, paymentData);

        if (res && res.data) {
          console.log("processPayment: ", res)

          if (res.data.success) {
            toast.success("Thanks! your payment was successful!", { theme: "colored" });

            //create order for future reference
            const specProducts = products?.map(p => {
              return ({
                _id: p._id,
                name: p.name,
                price: p.price,
                count: p.count
              })
            })


            const orderData = {
              products: specProducts,
              transaction_id: res.data.transaction.id,
              amount: payment,
              address: data.address
            }

            try {
              const orderRes = await createOrder(user._id, orderData)
              console.log('Create order: ', orderRes)

            } catch (error) {
              setLoading(false);
              console.log(error);
            }

            setLoading(false);

            emptyCart(() => {
              console.log("Payment success and empty cart.")
              setLength(itemTotal());
            })

          }

          if (!res.data.success)
            toast.error(res.data.message, { theme: "colored" });
        }
      }


    } catch (error: any) {
      setLoading(false);
      toast.error(error.message, { theme: "colored" });
    }
  }

  const handleAddress = (value: string) => {

    setData({ ...data, address: value })
  }

  const showLoader = () => {
    return (
      <div className="PropagateLoader my-3  py-3 text-center">
        <PropagateLoader color={ color } loading={ loading } size={ 20 } />
      </div>)
  }

  const showDropIn = () => {
    return <div>
      { data.clientToken !== null && products && products.length > 0 && (
        <div>
          { showLoader() }
          <div className="form-group mb-3">
            <label className='text-muted'>Delivery address:</label>
            <textarea
              onChange={ (e) => handleAddress(e.target.value) }
              className="form-control"
              value={ data.address }
              placeholder="Type your delivery address here..."
            />
          </div>


          <DropIn
            options={ {
              authorization: data.clientToken,
              // paypal: {
              //   flow: "vault"
              // }
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
      <h2 className='fs-3'>Total amount: ${ getTotal() }</h2>

      { user && <div className='w-100 mt-3'>{ showDropIn() }</div> }
      { !user &&

        <Link to="/signin"><button className='btn btn-primary w-100 mt-3'>Signin to checkout</button></Link>

      }
    </div>
  )
}

export default Checkout