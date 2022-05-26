import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CardComponent from '../../common/CardComponent';
import Menu from '../../core/Menu';
import SignupForm from './SignupForm';
import { SignupFormikConfig } from './SignupFormikConfig';


const Signup = () => {

  //formik configuration for signup form
  const formik = SignupFormikConfig()


  return (
    <React.Fragment>

      <ToastContainer />

      <Menu />

      <CardComponent
        title="Signup"
        subtitle="Signup to Book TreKKer."
      >
        <SignupForm
          formik={ formik }
        />
      </CardComponent>

    </React.Fragment >
  );
}

export default Signup
