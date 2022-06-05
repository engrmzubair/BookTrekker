import React from 'react'
import AddCatFormikConfig from './AddCatFormikConfig';
import { ToastContainer } from 'react-toastify';
import CardComponent from '../../../common/CardComponent';
import Menu from '../../../core/Menu';
import AddCatForm from './AddCatForm';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { currentUser } from '../../../user/userSlice';

type Props = {}

const AddCategory = (props: Props) => {

  const user = useAppSelector(currentUser)
  const dispatch = useAppDispatch()

  //formik configuration for add category
  const formik = AddCatFormikConfig(dispatch, user);


  return (
    <React.Fragment>

      <ToastContainer />

      <Menu />

      <CardComponent
        title="Add Category"
        className='w-50 m-auto mt-5'
        primary={ true }
      >
        <AddCatForm
          formik={ formik }
        />
      </CardComponent>

    </React.Fragment >
  )
}

export default AddCategory