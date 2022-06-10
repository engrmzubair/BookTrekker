import { Form } from 'react-bootstrap'
import React from 'react'
import { FormikSignin } from '../user/signin/SigninFormikConfig';
import { FormikSignup } from '../user/signup/SignupFormikConfig';
import { FormikAddCat } from '../adminResource/category/createCategory/AddCatFormikConfig';
import { FormikAddProd } from '../adminResource/product/createProduct/AddProdFormikConfig';
import { FormikSearch } from '../core/search/Search';
import { FormikProfile } from '../user/profile/ProfileFormikConfig';

export type formikForInput = FormikSignin | FormikSignup | FormikAddCat | FormikAddProd | FormikSearch | FormikProfile;

type Props = {
  value?: string | number,
  label?: string,
  type: string,
  placeholder: string,
  formText?: string,
  error?: string,
  name: string,
  accept?: string,
  formik: formikForInput
}

const Input = ({ value, label, type, name, error, accept, placeholder, formText, formik }: Props) => {

  const className = `form-control ${error && "is-invalid"}`

  const isFile = type === 'file';

  return (
    <React.Fragment>

      <Form.Group className="mb-3">
        <Form.Label>{ label }</Form.Label>

        <input
          onChange={ !isFile ? formik.handleChange : e => {

            formik.setFieldValue('photo', e.target.files?.length && e.target.files[0], false)
          } }
          className={ className }
          accept={ accept }
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