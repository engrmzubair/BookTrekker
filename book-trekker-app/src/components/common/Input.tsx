import { Form } from 'react-bootstrap'
import React from 'react'
import { FormikSignin } from '../user/signin/SigninFormikConfig';
import { FormikSignup } from '../user/signup/SignupFormikConfig';

type Props = {
  value: string
  label: string,
  type: string,
  placeholder: string,
  formText?: string,
  error?: string,
  name: string
  formik: FormikSignin | FormikSignup
}

const Input = ({ value, label, type, name, error, placeholder, formText, formik }: Props) => {

  const className = `form-control ${error ? "is-invalid" : "is-valid"
    }`

  return (
    <React.Fragment>

      <Form.Group className="mb-3">
        <Form.Label>{ label }</Form.Label>

        <input
          onChange={ formik.handleChange }
          className={ className }
          value={ value }
          name={ name }
          type={ type }
          placeholder={ placeholder } />

        { !error &&
          formText &&
          <Form.Text className="text-muted">
            { formText }
          </Form.Text> }

        <Form.Control.Feedback type="invalid">
          { error }
        </Form.Control.Feedback>

      </Form.Group>




    </React.Fragment>
  )
}

export default Input