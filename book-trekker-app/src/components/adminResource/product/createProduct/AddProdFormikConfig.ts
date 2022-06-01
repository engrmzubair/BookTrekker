import { useFormik, FormikProps } from "formik";
import { NavigateFunction } from "react-router-dom";
import * as Yup from "yup";
import http from '../../../../services/httpService';
import { API } from '../../../../config';
import { toast } from 'react-toastify';
import { User } from "../../../user/userSlice";


export interface FormValues {
  name: string,
  description: string,
  price: number,
  quantity: number,
  category: string,
  photo: File | undefined,
  sold: number,
  shipping: boolean

}
export type FormikAddProd = FormikProps<FormValues>

const FILE_SIZE = 1 * 1024 * 1024;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png"
];

const AddProdFormikConfig = (navigate: NavigateFunction, user: User | undefined) => {

  const formik: FormikAddProd =

    useFormik<FormValues>({

      initialValues: {
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        category: '',
        photo: undefined,
        sold: 0,
        shipping: false

      },
      validationSchema: Yup.object().shape({
        name: Yup.string().min(5).max(32).required(),
        description: Yup.string()
          .min(10).max(2000).required(),
        price: Yup.number().min(5).required(),
        quantity: Yup.number(),
        category: Yup.string().min(5).max(32).required(),
        photo: Yup
          .mixed()
          .required('photo is required')
          .test('fileSize', 'File too large', (value) => value === null || (value && value.size <= FILE_SIZE))
          .test(
            "fileFormat",
            "Unsupported Format",
            value => value && SUPPORTED_FORMATS.includes(value.type)
          ),
        sold: Yup.number(),
        shipping: Yup.string()
      }),

      onSubmit: values => {
        createProd(values)
      },
    });

  const createProd = async (values: FormValues) => {

    try {

      // const url = `${API}/product/create/${user?._id}`

      // const res = await http.multipartPost(values, url)

      toast.success("New product added")
      console.log(values)

      // formik.resetForm();

      // console.log("Product: ", res.data);

    } catch (err: any) { }


  }
  return formik;
}

export default AddProdFormikConfig;
