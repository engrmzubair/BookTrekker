import React from 'react'
import { Form } from 'react-bootstrap';
import { formikForInput } from './Input';



type Props = {
  label: string,
  categories: string[],
  formik: formikForInput
}

const CheckBox = ({ categories, label, formik }: Props) => {
  return (
    <React.Fragment>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Categories</Form.Label>
        <Form.Select aria-label="Default select example">
          <option>Open this select menu</option>

          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </Form.Group>
    </React.Fragment>
  )
}

export default CheckBox