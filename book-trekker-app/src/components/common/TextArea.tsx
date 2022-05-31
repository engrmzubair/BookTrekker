import { Form } from 'react-bootstrap'
import React from 'react'
import { formikForInput } from './Input';

type Props = {
  value: string,
  label: string,
  placeholder: string,
  error?: string,
  name: string,
  formik: formikForInput
}

const TextArea = ({ value, label, name, error, placeholder, formik }: Props) => {

  const className = `form-control ${error && "is-invalid"}`

  return (
    <React.Fragment>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>{ label }</Form.Label>
        <Form.Control
          className={ className }
          as="textarea"
          name={ name }
          value={ value }
          placeholder={ placeholder }
          style={ { height: '100px' } }
          onChange={ formik.handleChange }
        />
        <Form.Control.Feedback type="invalid">
          { error }
        </Form.Control.Feedback>
      </Form.Group>




    </React.Fragment>
  )
}

export default TextArea