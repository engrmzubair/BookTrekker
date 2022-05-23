import { Form } from 'react-bootstrap'
import React from 'react'
import { HandleChange } from '../user/Signup'


type Props = {
  value: string
  label: string,
  type: string,
  placeholder: string,
  formText?: string,
  handleChange: HandleChange

}

const Input = ({ value, label, type, placeholder, formText, handleChange }: Props) => {
  return (
    <React.Fragment>

      <Form.Group className="mb-3">
        <Form.Label>{ label }</Form.Label>

        <input
          onChange={ e => handleChange(label, e) }
          className="form-control"
          value={ value }
          type={ type }
          placeholder={ placeholder } />

        { formText && <Form.Text className="text-muted">
          { formText }
        </Form.Text> }
      </Form.Group>




    </React.Fragment>
  )
}

export default Input