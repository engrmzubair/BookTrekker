import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Signup from './components/user/signup/Signup';
import NotFound from './components/core/NotFound';
import App from './App';
import Signin from './components/user/signin/Signin';
import Signout from './components/user/signout/Signout';
import Protected from './components/auth/Protected';
import AdminProtected from './components/auth/AdminProtected';
import AddCategory from './components/adminResource/category/createCategory/AddCategory';
import AddProduct from './components/adminResource/product/createProduct/AddProduct';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getProfile, userStatus } from './components/user/userSlice';
import { categoryStatus, fetchCategories } from './components/adminResource/category/categorySlice';


const PageRoutes = () => {

  const dispatch = useAppDispatch();
  const uStatus = useAppSelector(userStatus);
  const cStatus = useAppSelector(categoryStatus);
  const jwt = localStorage.getItem('bookTrekker_token');

  useEffect(() => {

    if (jwt && uStatus === 'idle')
      dispatch(getProfile());

    if (cStatus === "idle")
      dispatch(fetchCategories())

  }, []);

  return (

    <Routes>
      <Route path="/" element={ <App /> } />
      <Route path="signup" element={ <Signup /> } />
      <Route path="signin" element={ <Signin /> } />
      <Route path="signout" element={ <Signout /> } />
      <Route path="/user/dashboard" element={ <Protected /> } />
      <Route path="/admin/dashboard" element={ <AdminProtected /> } />

      <Route path="/create/category" element={
        <AdminProtected >
          <AddCategory />
        </AdminProtected> } />

      <Route path="/create/product" element={
        <AdminProtected >
          <AddProduct />
        </AdminProtected> } />

      <Route path="*" element={ <NotFound /> } />
    </Routes >
  )
}

export default PageRoutes