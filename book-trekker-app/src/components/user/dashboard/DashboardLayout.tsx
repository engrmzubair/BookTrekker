import React from 'react'
import Layout from '../../core/Layout'
import Menu from '../../core/Menu'
import DashboardContent from './DashboardContent';

const DashboardLayout = () => {

  return (
    <React.Fragment>
      <Menu />

      <Layout title='Dashboard' description='User Dashboard' />

      <DashboardContent />



    </React.Fragment>
  )
}

export default DashboardLayout