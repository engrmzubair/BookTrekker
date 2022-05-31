import { Form } from 'react-bootstrap';
import Input from '../../../common/Input';
import ButtonComp from '../../../common/ButtonComp';
import { FormikAddProd } from './AddProdFormikConfig';
import TextArea from '../../../common/TextArea';
import CheckBox from '../../../common/CheckBox';


type Props = {
  formik: FormikAddProd
}

const AddProdFrom = ({ formik }: Props) => {
  const {
    name,
    description,
    price,
    quantity,
    category,
    sold,
    shipping,
    photo

  } = formik.values;

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
        label='Product'
        type='text'
        placeholder='Enter product name.'
        error={ errors.name }
      />

      <TextArea
        name='description'
        label='Description'
        value={ description }
        placeholder="Add a product description."
        error={ errors.description }
        formik={ formik }
      />


      <Input
        formik={ formik }
        accept='image/*'
        name='photo'
        label='Product'
        type='file'
        placeholder='Enter product name.'
        error={ errors.photo }
      />

      <Input
        value={ price }
        formik={ formik }
        name='price'
        label='Price'
        type='number'
        placeholder='Enter price.'
        error={ errors.price }
      />

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Categories</Form.Label>
        <Form.Select aria-label="Default select example">
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </Form.Group>


      <CheckBox
        name='shipping'
        label='Shipping'
        formik={ formik }

      />

      <ButtonComp
        variant="primary"
        type="submit"
        text="Submit"
      />
    </Form>
  )
}

export default AddProdFrom