import React from 'react'
import Menu from '../../core/Menu';
import Layout from '../../core/Layout';
import Search from '../../core/search/Search';

type Props = {}

const ManageProducts = (props: Props) => {
  return (
    <React.Fragment>
      <Menu />
      <Layout
        title="Manage Products"
        description="Perform CRUD on products." >
      </Layout>
      <Search />

      <h2 className='mb-4'>Manage Products</h2>



    </React.Fragment >
  )
}

export default ManageProducts