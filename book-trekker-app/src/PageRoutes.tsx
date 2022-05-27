import { Route, Routes } from 'react-router-dom';
import Signup from './components/user/signup/Signup';
import NotFound from './components/core/NotFound';
import App from './App';
import Signin from './components/user/signin/Signin';
import Signout from './components/user/signout/Signout';


const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={ <App /> } />
      <Route path="signup" element={ <Signup /> } />
      <Route path="signin" element={ <Signin /> } />
      <Route path="signout" element={ <Signout /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes >
  )
}

export default PageRoutes