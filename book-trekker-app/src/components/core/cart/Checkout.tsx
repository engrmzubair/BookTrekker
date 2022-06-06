import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks'
import { Product } from '../../adminResource/product/productSlice'
import { currentUser } from '../../user/userSlice'

type Props = {

  products: Product[] | undefined
}

const Checkout = ({ products }: Props) => {


  const user = useAppSelector(currentUser);

  const getTotal = () => {

    if (products)
      return products.reduce((p, n) => {
        if (n && n.count)
          return p + n.count * n.price
        return 1
      }, 0)

  }

  return (
    <div >
      <h2>Total amount: ${ getTotal() }</h2>

      { user && <button className='btn btn-success w-100 mt-3'>Checkout</button> }
      { !user &&

        <Link to="/signin"><button className='btn btn-primary w-100 mt-3'>Signin to checkout</button></Link>

      }
    </div>
  )
}

export default Checkout