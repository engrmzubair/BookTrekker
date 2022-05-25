import { Form, Button } from 'react-bootstrap';
import Input from '../common/Input';
import { Formik } from './Signup';

type Props = {
  formik: Formik
}

const SignupForm = ({ formik }: Props) => {
  const { name, email, password } = formik.values;
  const { handleSubmit, errors } = formik;

  return (
    <div
      className='row my-2 w-100 p-5'>
      <Form
        noValidate
        className='col-md-6 m-auto bg-light p-4 rounded-3'
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
          // onClick={ handleReset }
          className='w-100'
          variant="primary"
          type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default SignupForm