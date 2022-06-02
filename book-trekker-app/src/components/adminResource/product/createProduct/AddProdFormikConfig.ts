import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import http from '../../../../services/httpService';
import { API } from '../../../../config';
import { toast } from 'react-toastify';


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

const AddProdFormikConfig = ({ dispatch, user }: any) => {

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
        name: Yup.string().min(5).max(60).required(),
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

      const url = `${API}/product/create/${user?._id}`

      const { data } = await http.multipartPost(values, url);

      toast.success(`${data.name} product added`)

      formik.resetForm();

      console.log("Product: ", data);

    } catch (err: any) { }


  }
  return formik;
}

export default AddProdFormikConfig;
