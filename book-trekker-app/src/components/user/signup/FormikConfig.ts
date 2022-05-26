import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import http from '../../../services/httpService';
import { API } from '../../../config';

export interface FormValues {
  name: string;
  email: string;
  password: string;
}
export type Formik = FormikProps<FormValues>

export const FormikConfig = () => {

  const formik: Formik =

    useFormik<FormValues>({

      initialValues: {
        name: "",
        email: "",
        password: ""
      },
      validationSchema: Yup.object().shape({
        name: Yup.string().min(5).max(32).required("please enter name"),
        email: Yup.string().email("invalid email address").required("please enter email"),
        password: Yup.string().min(5).max(32).required("please enter password")
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
  return formik;
}


