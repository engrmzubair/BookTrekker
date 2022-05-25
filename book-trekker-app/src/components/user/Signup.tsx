import React from 'react';
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import http from '../../services/httpService';
import Menu from '../core/Menu';
import Layout from '../core/Layout';
import SignupForm from './SignupForm';
import { API } from '../../config';


export interface FormValues {
  name: string;
  email: string;
  password: string;
}
export type Formik = FormikProps<FormValues>

const Signup = () => {

  const formik: Formik =

    useFormik<FormValues>({

      initialValues: {
        name: "",
        email: "",
        password: ""
      },
      validationSchema: Yup.object().shape({
        name: Yup.string().min(5).max(32).required("Please enter name"),
        email: Yup.string().email("Invalid email address").required("Please enter email"),
        password: Yup.string().min(5).max(32).required("Please enter password")
      }),

      onSubmit: values => {
        signup(values)
      },
    });

  const signup = async (values: FormValues) => {

    try {

      const res = await http.post(`${API}/auth/signup`, values)
      formik.resetForm()
      console.log(res && res.data);
    } catch (err: any) {

      if (err.response && err.response.data && err.response.data.message)
        toast.error(err.response.data.message, { theme: 'dark' })
    }

  }

  return (
    <React.Fragment>
      <ToastContainer />
      <Menu />
      <Layout
        title="Signup"
        description="Signup to Book TreKKer."
      />
      <SignupForm
        formik={ formik }
      />
    </React.Fragment>
  );
}

export default Signup
