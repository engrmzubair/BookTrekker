import { Form } from 'react-bootstrap';
import Input from '../../common/Input';
import { FormikSignup } from './SignupFormikConfig';
import ButtonComp from '../../common/ButtonComp';

type Props = {
  formik: FormikSignup
}

const SignupForm = ({ formik }: Props) => {
  const { name, email, password } = formik.values;
  const { handleSubmit, errors } = formik;

  return (

    <Form
      noValidate
      className=' mt-2 p-4 rounded-3'
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

      <ButtonComp
        variant="primary"
        type="submit"
        text="Submit"
      />
    </Form>

  )
}

export default SignupForm