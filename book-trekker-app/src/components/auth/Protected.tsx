import { Navigate } from "react-router-dom";
import { useAppSelector } from '../../app/hooks'
import { currentUser } from '../user/userSlice';
import UserDashboard from "../user/dashboard/UserDashboard";

type Props = { children?: JSX.Element }

const Protected = ({ children }: Props) => {
  const user = useAppSelector(currentUser)

  const isAdmin = user && user.role === 1;

  if (!user)
    return < Navigate to="/signin" replace={ true } />

  if (isAdmin)
    return <Navigate to='/admin/dashboard' replace={ true } />

  if (children) return children

  return <UserDashboard />


}

export default Protected