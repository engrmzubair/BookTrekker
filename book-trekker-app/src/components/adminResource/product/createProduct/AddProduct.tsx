import React from 'react'
import { ToastContainer } from 'react-toastify';
import CardComponent from '../../../common/CardComponent';
import Menu from '../../../core/Menu';
import AddProdFrom from './AddProdFrom';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../../../../app/hooks';
import { currentUser } from '../../../user/userSlice';
import AddProdFormikConfig from './AddProdFormikConfig';

type Props = {}

const AddProduct = (props: Props) => {

  const user = useAppSelector(currentUser)
  const navigate = useNavigate()

  //formik configuration for add category
  const formik = AddProdFormikConfig(navigate, user);
  return (
    <React.Fragment>

      <ToastContainer />

      <Menu />

      <CardComponent
        title="Add Category"
        className='w-50 m-auto mt-5'
      >
        <AddProdFrom
          formik={ formik }
        />
      </CardComponent>

    </React.Fragment >
  )
}

export default AddProduct