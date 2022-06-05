import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Category } from '../../adminResource/category/categorySlice'
import { HandleFilters } from './Shop'

type Props = {
  categories: Category[] | undefined,
  handleFilters: HandleFilters
}

const ShopCheckBox = ({ categories, handleFilters }: Props) => {

  const [checked, setChecked] = useState<string[]>([]);

  const handleToggle = (catId: string) => () => {
    const index = checked.indexOf(catId)
    const newCheckedCategoryId = [...checked]

    if (index === -1)
      newCheckedCategoryId.push(catId)
    else
      newCheckedCategoryId.splice(index, 1)

    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId, "category")
  }



  return (
    <React.Fragment>
      { categories?.map((c, i) => (

        <div key={ i } className="form-check my-2">
          <input
            onChange={ handleToggle(c._id) }
            className="form-check-input"
            type="checkbox" />
          <label className="form-check-label" >
            { c.name }
          </label>
        </div>
      )) }
    </React.Fragment>
  )
}

export default ShopCheckBox