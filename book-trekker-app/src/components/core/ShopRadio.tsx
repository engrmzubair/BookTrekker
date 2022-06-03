import React from 'react'
import { HandleFilters } from './Shop'

type Props = {
  prices: {
    _id: number;
    name: string;
    array: number[];
  }[],
  handleFilters: HandleFilters
}

const ShopRadio = ({ prices, handleFilters }: Props) => {

  const handleToggle = (prices: number[]) => () => {

    handleFilters(prices, "price")
  }


  return (
    <React.Fragment>
      { prices?.map((p, i) => (

        <div key={ i } className="form-check my-2">
          <input
            onChange={ handleToggle(p.array) }
            className="form-check-input"
            name='shopRadio'
            type="radio" />
          <label className="form-check-label" >
            { p.name }
          </label>
        </div>
      )) }
    </React.Fragment>
  )
}

export default ShopRadio