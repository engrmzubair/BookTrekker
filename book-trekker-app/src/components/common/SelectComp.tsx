import React from 'react'
import { Form } from 'react-bootstrap';
import { formikForInput } from './Input';
import { Category } from '../adminResource/category/categorySlice';



type Props = {
  label: string,
  name: string,
  value: string,
  categories: Category[] | undefined,
  formik: formikForInput,
  error: string | undefined
}

const SelectComp = ({ name, error, value, categories, label, formik }: Props) => {
  const className = `form-control ${error && "is-invalid"}`
  return (
    <React.Fragment>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>{ label }</Form.Label>
        <Form.Select
          name={ name }
          value={ value }
          onChange={ formik.handleChange }
          className={ className }
          aria-label="Default select example">
          <option value="">Select Category ...</option>

          {
            categories && categories.map((c, i) => {
              return (
                <option
                  value={ c._id }
                  key={ i }
                >
                  { c.name }
                </option>
              )
            })
          }
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          { error }
        </Form.Control.Feedback>
      </Form.Group>
    </React.Fragment>
  )
}

export default SelectComp;