import { Form, Button } from 'react-bootstrap';
import Input from '../../common/Input';
import { Formik } from './FormikConfig';

type Props = {
  formik: Formik
}

const SignupForm = ({ formik }: Props) => {
  const { name, email, password } = formik.values;
  const { handleSubmit, errors } = formik;

  return (

    <Form
      noValidate
      className=' mt-4p-4 rounded-3'
      onSubmit={ handleSubmit }>

      <Input
        value={ name }
        formik={ formik }
        name="name"
        label='Name'
        type='text'
        placeholder='Enter Name'
        error={ errors.name }
      />

      <Input
        value={ email }
        formik={ formik }
        name='email'
        label='Email'
        type='email'
        placeholder='Enter Email'
        formText="We'll never share your email with anyone else."
        error={ errors.email }
      />

      <Input
        value={ password }
        formik={ formik }
        name="password"
        label='Password'
        type='password'
        placeholder='Enter Password'
        error={ errors.password }
      />

      <Button
        className='w-100 mb-3'
        variant="primary"
        type="submit">
        Submit
      </Button>
    </Form>

  )
}

export default SignupForm