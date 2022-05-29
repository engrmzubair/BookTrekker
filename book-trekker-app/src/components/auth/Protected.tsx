import { Navigate } from "react-router-dom";
import { useAppSelector } from '../../app/hooks'
import { currentUser } from '../user/userSlice';
import UserDashboard from "../user/dashboard/user/UserDashboard";

const Protected = () => {
  const user = useAppSelector(currentUser)

  const isAdmin = user && user.role === 1;

  if (!user)
    return < Navigate to="/signin" replace={ true } />

  if (isAdmin)
    return <Navigate to='/admin/dashboard' replace={ true } />

  return <UserDashboard />


}

export default Protected