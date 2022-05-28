import React from 'react'
import Layout from '../core/Layout'
import Menu from '../core/Menu'
import CardComponent from '../common/CardComponent';

type Props = {}

const Dashboard = (props: Props) => {
  return (

    <React.Fragment>
      <Menu />

      <Layout title='Dashboard' description='User Dashboard' />

      <CardComponent
        title='User Information'
        className="col-lg-8 bg-secondary color-light m-auto"
      >


      </CardComponent>

    </React.Fragment>
  )
}

export default Dashboard