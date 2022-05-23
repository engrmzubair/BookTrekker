import { Form, Button, Container } from 'react-bootstrap';
import Input from '../common/Input';
import { HandleChange, Values } from './Signup';

type Props = {
  values: Values,
  handleChange: HandleChange
}

const SignupForm = ({ values, handleChange }: Props) => {


  return (
    <Container className='row m-4'>
      <Form className='col-md-6 m-auto'>

        <Input
          value={ values.name }
          handleChange={ handleChange }
          label='Name'
          type='text'
          placeholder='Enter Name'
        />

        <Input
          value={ values.email }
          handleChange={ handleChange }
          label='Email'
          type='email'
          placeholder='Enter Email'
          formText="We'll never share your email with anyone else."
        />

        <Input
          value={ values.password }
          handleChange={ handleChange }
          label='Password'
          type='password'
          placeholder='Enter Password'
        />

        <Button className='w-100' variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default SignupForm