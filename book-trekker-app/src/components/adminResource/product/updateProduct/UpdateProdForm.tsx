import { Form } from 'react-bootstrap';
import Input from '../../../common/Input';
import ButtonComp from '../../../common/ButtonComp';
import { FormikUpdateProd } from './UpdateProdFormikConfig';
import TextArea from '../../../common/TextArea';
import CheckBox from '../../../common/CheckBox';
import { useAppSelector } from '../../../../app/hooks';
import { getCategories } from '../../category/categorySlice';
import SelectComp from '../../../common/SelectComp';


type Props = {
  formik: FormikUpdateProd
}

const UpdateProdForm = ({ formik }: Props) => {
  const {
    name,
    description,
    price,
    category,
  } = formik.values;

  const { handleSubmit, errors } = formik;
  const cat = useAppSelector(getCategories);


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

      <SelectComp
        name="category"
        value={ category }
        label='Categories'
        categories={ cat }
        formik={ formik }
        error={ errors.category }

      />

      <CheckBox
        name='shipping'
        label='Shipping'
        value={ formik.values.shipping }
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

export default UpdateProdForm