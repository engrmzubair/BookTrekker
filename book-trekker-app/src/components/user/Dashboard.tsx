import React from 'react'
import Layout from '../core/Layout'
import Menu from '../core/Menu'

type Props = {}

const Dashboard = (props: Props) => {
  return (

    <React.Fragment>
      <Menu />

      <Layout title='Dashboard' description='User Dashboard'>
        ....
      </Layout>
    </React.Fragment>
  )
}

export default Dashboard