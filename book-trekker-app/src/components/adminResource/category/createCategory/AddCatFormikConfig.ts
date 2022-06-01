import { useFormik, FormikProps } from "formik";
import { NavigateFunction } from "react-router-dom";
import * as Yup from "yup";
import http from '../../../../services/httpService';
import { API } from '../../../../config';
import { toast } from 'react-toastify';
import { User } from "../../../user/userSlice";
import { addCategory } from "../categorySlice";


export interface FormValues {
  name: string
}
export type FormikAddCat = FormikProps<FormValues>

const AddCatFormikConfig = (dispatch: any, user: User | undefined) => {

  const formik: FormikAddCat =

    useFormik<FormValues>({

      initialValues: {
        name: ""
      },
      validationSchema: Yup.object().shape({
        name: Yup.string().min(5).max(32).required("please enter category name")
      }),

      onSubmit: values => {
        createCategory(values)
      },
    });

  const createCategory = async (values: FormValues) => {

    try {
      const { data } = await http.post(`${API}/category/create/${user?._id}`, values)

      dispatch(addCategory(data))

      toast.success(`${data.name} category added`)

      formik.resetForm();

      console.log("Category ", data);


    } catch (err: any) { }


  }
  return formik;
}

export default AddCatFormikConfig;