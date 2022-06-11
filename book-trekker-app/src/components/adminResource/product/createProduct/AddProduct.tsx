import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import CardComponent from '../../../common/CardComponent';
import Menu from '../../../core/Menu';
import AddProdFrom from './AddProdFrom';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import AddProdFormikConfig, { FormValues } from './AddProdFormikConfig';
import { currentUser } from '../../../user/userSlice';
import { createProduct } from '../../../core/apiCore';
import PropagateLoader from "react-spinners/PropagateLoader";

type Props = {}

const AddProduct = (props: Props) => {

  const user = useAppSelector(currentUser)
  const [loading, setLoading] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#417505");


  const createProd = async (values: FormValues) => {
    try {
      setLoading(true)

      if (user && user._id) {

        const { data } = await createProduct(user?._id, values)

        setLoading(false)

        toast.success(`${data.name} product added`)

        formik.resetForm();

        console.log("Product: ", data);
      }

    } catch (err: any) {
      setLoading(false)
      console.log(err)
    }
  }


  //formik configuration for add category
  const formik = AddProdFormikConfig(createProd);

  const showLoader = () => {
    return (
      <div className="PropagateLoader my-3  py-3 text-center">
        <PropagateLoader color={ color } loading={ loading } size={ 30 } />
      </div>)
  }

  return (
    <React.Fragment>

      <ToastContainer />

      <Menu />

      { showLoader() }

      <CardComponent
        title="Add Product"
        className='w-50 m-auto mt-5'
        primary={ true }
      >
        <AddProdFrom
          formik={ formik }
        />
      </CardComponent>

    </React.Fragment >
  )
}

export default AddProduct