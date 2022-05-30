import React, { ReactElement } from 'react'
import { Navigate } from "react-router-dom";
import { useAppSelector } from '../../app/hooks'
import { currentUser } from '../user/userSlice';
import AdminDashboard from '../user/dashboard/AdminDashboard';

type Props = { children?: ReactElement }

const AdminProtected = ({ children }: Props) => {
  const user = useAppSelector(currentUser)

  const isAdmin = user && user.role === 1;

  if (!user)
    return < Navigate to="/signin" replace={ true } />

  if (!isAdmin)
    return < Navigate to="/user/dashboard" replace={ true } />

  if (children)
    return children

  return <AdminDashboard />

}

export default AdminProtected