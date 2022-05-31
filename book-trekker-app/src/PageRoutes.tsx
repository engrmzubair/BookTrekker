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

const PageRoutes = () => {
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