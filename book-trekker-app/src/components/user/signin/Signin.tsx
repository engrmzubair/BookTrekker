import React from 'react'
import Menu from '../../core/Menu'
import CardComponent from '../../common/CardComponent';
import { SigninFormikConfig } from './SigninFormikConfig';
import { ToastContainer } from 'react-toastify';
import SigninForm from './SigninForm';


const Signin = () => {

  //formik configuration for signup form
  const formik = SigninFormikConfig();

  return (
    <React.Fragment>

      <ToastContainer />

      <Menu />

      <CardComponent
        title="Signin"
        subtitle="Signin to Book TreKKer."
      >
        <SigninForm
          formik={ formik }
        />
      </CardComponent>

    </React.Fragment >
  )
}


export default Signin