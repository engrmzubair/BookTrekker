import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../../app/hooks';
import { removeUser } from '../userSlice';

const Signout = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {

    //remove token from local storage
    localStorage.removeItem('bookTrekker_token');

    //remove user form redux store
    dispatch(removeUser())

    navigate("../", { replace: true });
  });

  return null
}

export default Signout