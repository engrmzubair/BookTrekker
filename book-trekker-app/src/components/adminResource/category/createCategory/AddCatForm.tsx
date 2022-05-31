import { Form, } from 'react-bootstrap';
import Input from '../../../common/Input';
import ButtonComp from '../../../common/ButtonComp';
import { FormikAddCat } from './AddCatFormikConfig';

type Props = {
  formik: FormikAddCat
}

const AddCatForm = ({ formik }: Props) => {
  const { name } = formik.values;
  const { handleSubmit, errors } = formik;

  return (

    <Form
      noValidate
      className=' mt-2 p-4 rounded-3'
      onSubmit={ handleSubmit }>

      <Input
        value={ name }
        formik={ formik }
        name='name'
        label='Category'
        type='text'
        placeholder='Enter category name.'
        error={ errors.name }
      />

      <ButtonComp
        variant="primary"
        type="submit"
        text="Submit"
      />
    </Form>

  )
}

export default AddCatForm