import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useFormik, FormikProps } from 'formik';
import { Container, Form } from 'react-bootstrap';
import Icon from '@reacticons/bootstrap-icons';
import { getCategories } from '../adminResource/category/categorySlice';
import SelectComp from '../common/SelectComp';
import { fetchList } from './apiCore';
import { Product } from '../adminResource/product/productSlice';

export interface FormValue {
  search: string;
  category: string;
}
export type FormikSearch = FormikProps<FormValue>





type Props = {}

type Searched = {
  data: Product[] | undefined,
  searched: boolean
}

const Search = (props: Props) => {
  const categories = useAppSelector(getCategories);
  const [data, setData] =
    useState<Searched>({ data: undefined, searched: false })

  const formik: FormikSearch = useFormik<FormValue>({

    initialValues: {
      search: "",
      category: 'All'
    },

    onSubmit: async values => {

      try {
        const res = await fetchList(values);
        console.log(res)

        setData({ ...res.data, searched: true });

      } catch (error) {

      }

      console.log(values);
      console.log('submitted');
    },

  });
  return (
    <div className='row my-4'>
      <Container className='col-md-7 mx-auto'>
        <Form
          onSubmit={ formik.handleSubmit }
        >
          <span className='input-group-text p-2 bg-secondary py-4'>
            <div className='input-group input-group-lg'>
              <div className='input-group ms-1 '>
                <select
                  className='btn me-3 ms-5 btn-light'
                  name='category'
                  onChange={ formik.handleChange }
                >
                  <option value="All">Select Category</option>
                  { categories?.map((c, i) => (
                    <option
                      key={ i }
                      value={ c._id }
                    >
                      { c.name }
                    </option>
                  )) }

                </select>

                <span >
                  <input
                    className='form-control px-5'
                    name='search'
                    placeholder='Search products by name...'
                    onChange={ formik.handleChange }
                  />
                </span>
                <button
                  type='submit'
                  className='input-group-text btn btn-light ms-3'>
                  <Icon name='search' /> Search
                </button>
              </div>

            </div>
          </span>


        </Form>
      </Container>

    </div>
  )
}

export default Search