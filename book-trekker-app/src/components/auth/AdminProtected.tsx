import { Navigate } from "react-router-dom";
import { useAppSelector } from '../../app/hooks'
import { currentUser } from '../user/userSlice';
import UserDashboard from "../user/dashboard/user/UserDashboard";
import AdminDashboard from '../user/dashboard/admin/AdminDashboard';

type Props = {}

const AdminProtected = (props: Props) => {
  const user = useAppSelector(currentUser)

  const isAdmin = user && user.role === 1;

  if (!user)
    return < Navigate to="/signin" replace={ true } />

  if (!isAdmin)
    return <UserDashboard />


  return <AdminDashboard />
}

export default AdminProtected