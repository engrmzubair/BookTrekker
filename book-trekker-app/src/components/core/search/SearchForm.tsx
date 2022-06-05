import React from 'react'
import { Container, Form, Row } from 'react-bootstrap';
import Icon from '@reacticons/bootstrap-icons';

import { FormikSearch } from './Search'
import { Category } from '../../adminResource/category/categorySlice';



type Props = {
  formik: FormikSearch,
  categories: Category[] | undefined
}



const SearchForm = ({ formik, categories }: Props) => {


  return (
    <Row>
      <Form
        onSubmit={ formik.handleSubmit }
        className='col-md-8 mx-auto'
      >
        <div className='input-group-text p-2 bg-secondary py-4'>
          <div className='input-group input-group-lg'>
            <div className='input-group ms-1 '>
              <select
                className='btn me-3 ms-5 btn-light mb-3'
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
                  className='form-control px-5 mb-3'
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
        </div>
      </Form>
    </Row>
  )
}

export default SearchForm