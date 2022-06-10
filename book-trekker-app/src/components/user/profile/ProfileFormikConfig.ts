import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import 'react-toastify/dist/ReactToastify.css';



export interface FormValues {
  name?: string;
  password?: string;
}
export type FormikProfile = FormikProps<FormValues>

export const ProfileFormikConfig = (next: any) => {

  const formik: FormikProfile =

    useFormik<FormValues>({

      initialValues: {
        name: "",
        password: ""
      },
      validationSchema: Yup.object().shape({
        name: Yup.string().min(5).max(32).required("please enter name"),
        password: Yup.string().min(5).max(32).required("please enter password")
      }),

      onSubmit: values => {
        next(values)
      },
    });


  return formik;
}


