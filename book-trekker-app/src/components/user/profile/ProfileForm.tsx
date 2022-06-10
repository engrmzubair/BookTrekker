import { Form } from 'react-bootstrap';
import Input from '../../common/Input';

import ButtonComp from '../../common/ButtonComp';
import { FormikProfile } from './ProfileFormikConfig';

type Props = {
  formik: FormikProfile
}

const ProfileForm = ({ formik }: Props) => {
  const { name, password } = formik.values;
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
        text="Update"
      />
    </Form>

  )
}

export default ProfileForm