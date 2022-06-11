import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Signup from './components/user/signup/Signup';
import NotFound from './components/core/NotFound';
import Shop from './components/core/search/Shop';
import App from './App';
import Signin from './components/user/signin/Signin';
import Signout from './components/user/signout/Signout';
import Protected from './components/auth/Protected';
import AdminProtected from './components/auth/AdminProtected';
import AddCategory from './components/adminResource/category/createCategory/AddCategory';
import Order from './components/adminResource/order/Order';
import AddProduct from './components/adminResource/product/createProduct/AddProduct';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getProfile, userStatus } from './components/user/userSlice';
import { categoryStatus, fetchCategories } from './components/adminResource/category/categorySlice';
import Product from './components/core/Product';
import Cart from './components/core/cart/Cart';
import Profile from "./components/user/profile/Profile"
import ManageProducts from './components/adminResource/product/ManageProducts';

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
      <Route path="shop" element={ <Shop /> } />
      <Route path="cart" element={ <Cart /> } />
      <Route path="signin" element={ <Signin /> } />
      <Route path="signout" element={ <Signout /> } />
      <Route path="/user/dashboard" element={ <Protected /> } />
      <Route path="/profile/:userId" element={ <Protected>

        <Profile />
      </Protected>
      } />
      <Route path="/admin/dashboard" element={ <AdminProtected /> } />

      <Route path="/create/category" element={
        <AdminProtected >
          <AddCategory />
        </AdminProtected> } />
      <Route path="/admin/products" element={
        <AdminProtected >
          <ManageProducts />
        </AdminProtected> } />
      <Route path="/admin/orders" element={
        <AdminProtected >
          <Order />
        </AdminProtected> } />

      <Route path="/create/product" element={
        <AdminProtected >
          <AddProduct />
        </AdminProtected> } />

      <Route path="/product/:productId" element={ <Product /> } />

      <Route path="*" element={ <NotFound /> } />
    </Routes >
  )
}

export default PageRoutes