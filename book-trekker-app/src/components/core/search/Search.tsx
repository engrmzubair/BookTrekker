import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useFormik, FormikProps } from 'formik';
import { Container, Form } from 'react-bootstrap';
import Icon from '@reacticons/bootstrap-icons';
import { getCategories } from '../../adminResource/category/categorySlice';
import SelectComp from '../../common/SelectComp';
import { fetchList } from '../apiCore';
import { Product } from '../../adminResource/product/productSlice';
import SearchForm from './SearchForm';
import SearchedProducts from './SearchedProducts';

export interface FormValue {
  search: string;
  category: string;
}
export type FormikSearch = FormikProps<FormValue>


type Props = {}

type products = Product[] | undefined

const Search = (props: Props) => {
  const categories = useAppSelector(getCategories);
  const [products, setProducts] = useState<products>(undefined)
  const [searched, setSearched] =
    useState<boolean>(false)

  const formik: FormikSearch = useFormik<FormValue>({

    initialValues: {
      search: "",
      category: 'All'
    },

    onSubmit: async values => {

      if (values.search)
        try {
          const res = await fetchList(values);
          console.log(res)

          setProducts([...res.data])
          setSearched(true)


        } catch (error) {

        }
      return
    },


  });

  return (
    <React.Fragment>

      <Container className='my-5'>
        <SearchForm
          formik={ formik }
          categories={ categories }
        />
      </Container>

      <Container className='my-5'>

        <SearchedProducts
          products={ products }
          searched={ searched }
        />
      </Container>
    </React.Fragment>
  )
}

export default Search