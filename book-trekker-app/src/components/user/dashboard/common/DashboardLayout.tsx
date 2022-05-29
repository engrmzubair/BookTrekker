import React from 'react'
import { useAppSelector } from '../../../../app/hooks';
import Layout from '../../../core/Layout'
import Menu from '../../../core/Menu'
import DashboardContent from './DashboardContent';
import { currentUser } from '../../userSlice';

const DashboardLayout = () => {
  const user = useAppSelector(currentUser);

  return (
    <React.Fragment>
      <Menu />

      <Layout
        title='Dashboard'
        description={ `Good Day ${user && user.name}!` } />


      <DashboardContent />



    </React.Fragment>
  )
}

export default DashboardLayout