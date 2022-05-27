import React, { ReactElement } from 'react'
import { Navigate } from "react-router-dom";
import { useAppSelector } from '../../app/hooks'
import { currentUser } from '../user/userSlice';

type Props = {
  children: ReactElement
}

const Protected = ({ children }: Props) => {
  const user = useAppSelector(currentUser)

  if (user) return children

  return < Navigate to="/signin" replace={ true } />

}

export default Protected