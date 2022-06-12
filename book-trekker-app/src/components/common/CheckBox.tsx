import React from 'react'
import { Form } from 'react-bootstrap';
import { formikForInput } from './Input';



type Props = {
  label: string,
  value?: boolean
  name: string,
  formik: formikForInput
}

const CheckBox = ({ name, label, formik, value }: Props) => {
  return (
    <React.Fragment>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          name={ name }
          type="checkbox"
          label={ label }
          checked={ value }
          onChange={ formik.handleChange }
        />
      </Form.Group>
    </React.Fragment>
  )
}

export default CheckBox