import React from 'react';
import axios from 'axios';
import Menu from '../core/Menu';
import Layout from '../core/Layout';
import SignupForm from './SignupForm';
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
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

      const res = await axios.post(`${API}/auth/signup`, values)
      console.log(res.data);
    } catch (error: any) {
      console.log(error.response.data.message)
    }





  }



  return (
    <React.Fragment>
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
