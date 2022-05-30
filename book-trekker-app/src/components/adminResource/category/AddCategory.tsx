import React from 'react'
import { useNavigate } from "react-router-dom";
import AddCatFormikConfig from './AddCatFormikConfig';
import { ToastContainer } from 'react-toastify';
import CardComponent from '../../common/CardComponent';
import Menu from '../../core/Menu';
import AddCatForm from './AddCatForm';
import { useAppSelector } from '../../../app/hooks';
import { currentUser } from '../../user/userSlice';

type Props = {}

const AddCategory = (props: Props) => {

  const user = useAppSelector(currentUser)
  const navigate = useNavigate()

  //formik configuration for add category
  const formik = AddCatFormikConfig(navigate, user);


  return (
    <React.Fragment>

      <ToastContainer />

      <Menu />

      <CardComponent
        title="Add Category"
        className='w-50 m-auto mt-5'
      >
        <AddCatForm
          formik={ formik }
        />
      </CardComponent>

    </React.Fragment >
  )
}

export default AddCategory