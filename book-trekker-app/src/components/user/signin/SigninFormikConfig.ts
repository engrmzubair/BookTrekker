import { useFormik, FormikProps } from "formik";
import { NavigateFunction } from "react-router-dom";
import * as Yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import http from '../../../services/httpService';
import { API } from '../../../config';
import { saveUser } from "../userSlice";


export interface FormValues {
  email: string;
  password: string;
}
export type FormikSignin = FormikProps<FormValues>

export const SigninFormikConfig = (navigate: NavigateFunction, dispatch: any) => {

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

      const token = res.headers['x-auth-token']

      //store token in localStorage
      localStorage.setItem('bookTrekker_token', token)

      console.log("User ", res.data);

      dispatch(saveUser(res.data))

      navigate("../", { replace: true });
    } catch (err: any) { }


  }
  return formik;
}


