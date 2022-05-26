import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import http from '../../../services/httpService';
import { API } from '../../../config';

export interface FormValues {
  email: string;
  password: string;
}
export type FormikSignin = FormikProps<FormValues>

export const SigninFormikConfig = () => {

  const formik: FormikSignin =

    useFormik<FormValues>({

      initialValues: {
        email: "",
        password: ""
      },
      validationSchema: Yup.object().shape({
        email: Yup.string().email("invalid email address").required("please enter email"),
        password: Yup.string().min(5).max(32).required("please enter password")
      }),

      onSubmit: values => {
        signin(values)
      },
    });

  const signin = async (values: FormValues) => {

    try {

      const res = await http.post(`${API}/auth/signin`, values)
      // formik.resetForm()
      console.log(res && res.data);
    } catch (err: any) {

      if (err.response && err.response.data && err.response.data.message)
        toast.error(err.response.data.message, { theme: 'dark' })
    }

  }
  return formik;
}


