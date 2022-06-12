import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import CardComponent from '../../../common/CardComponent';
import Menu from '../../../core/Menu';
import UpdateProdForm from './UpdateProdForm';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import UpdateProdFormikConfig, { FormValues } from './UpdateProdFormikConfig';
import { currentUser } from '../../../user/userSlice';
import { updateProduct } from '../../../core/apiCore';
import PropagateLoader from "react-spinners/PropagateLoader";
import { fetchAllProducts, fetchProductById, getProduct, Product } from '../productSlice';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


type Props = {}

const UpdateProduct = (props: Props) => {

  const [color] = useState("#417505");
  const [loading, setLoading] = useState(false);
  const user = useAppSelector(currentUser)
  const product = useAppSelector(getProduct);
  const { productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch();


  useEffect(() => {

    if (productId)
      dispatch(fetchProductById(productId))

    if (product) {
      setFormValues(product)
    }
  }, [product?._id])


  const setFormValues = (p: Product) => {
    formik.setValues({
      name: p.name,
      description: p.description,
      price: p.price,
      quantity: p.quantity,
      category: p.category._id,
      photo: undefined,
      sold: 0,
      shipping: p.shipping
    })
  }


  const updateProd = async (values: FormValues) => {
    try {
      setLoading(true)

      if (user && user._id && productId) {

        const { data } = await updateProduct(productId, user._id, values)

        setLoading(false)

        toast.success(`${values.name} product updated`);
        dispatch(fetchAllProducts())

        formik.resetForm();

        setTimeout(() => {
          navigate('../admin/products')
        }, 3000);

        console.log("Product: ", data);
      }

    } catch (err: any) {
      setLoading(false)
      console.log(err)
    }
  }

  const showLoader = () => {
    return (
      <div className="PropagateLoader my-3  py-3 text-center">
        <PropagateLoader color={ color } loading={ loading } size={ 30 } />
      </div>)
  }



  //formik configuration for add category
  const formik =
    UpdateProdFormikConfig(updateProd, product
    );




  return (
    <React.Fragment>

      <ToastContainer />

      <Menu />

      { showLoader() }

      <CardComponent
        title="Update Product"
        className='w-50 m-auto mt-5'
        primary={ true }
      >
        <UpdateProdForm
          formik={ formik }
        />
      </CardComponent>

    </React.Fragment >
  )
}

export default UpdateProduct