import React from 'react'
import { ToastContainer } from 'react-toastify';
import CardComponent from '../../../common/CardComponent';
import Menu from '../../../core/Menu';
import AddProdFrom from './AddProdFrom';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import AddProdFormikConfig from './AddProdFormikConfig';
import { currentUser } from '../../../user/userSlice';

type Props = {}

const AddProduct = (props: Props) => {

  const dispatch = useAppDispatch()
  const user = useAppSelector(currentUser)

  const params = { dispatch, user }

  //formik configuration for add category
  const formik = AddProdFormikConfig(params);
  return (
    <React.Fragment>

      <ToastContainer />

      <Menu />

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