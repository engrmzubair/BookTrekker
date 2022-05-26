import { Route, Routes } from 'react-router-dom';
import Signup from './components/user/signup/Signup';
import Signin from './components/user/Signin';
import NotFound from './components/core/NotFound';
import App from './App';


const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={ <App /> } />
      <Route path="signup" element={ <Signup /> } />
      <Route path="signin" element={ <Signin /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes >
  )
}

export default PageRoutes