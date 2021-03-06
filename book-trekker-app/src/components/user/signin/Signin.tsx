import React from 'react'
import Menu from '../../core/Menu'
import CardComponent from '../../common/CardComponent';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../../app/hooks';
import { SigninFormikConfig } from './SigninFormikConfig';
import { ToastContainer } from 'react-toastify';
import SigninForm from './SigninForm';


const Signin = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  //formik configuration for signup form
  const formik = SigninFormikConfig(navigate, dispatch);

  return (
    <React.Fragment>

      <ToastContainer />

      <Menu />

      <CardComponent
        title="Signin"
        subtitle="Signin to Book TreKKer."
        className='w-50 m-auto mt-5'
        primary={ true }
      >
        <SigninForm
          formik={ formik }
        />
      </CardComponent>

    </React.Fragment >
  )
}


export default Signin