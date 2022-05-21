import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './features/user/Signup';
import Signin from './features/user/Signin';
import NotFound from './features/common/NotFound';
import App from './App';


const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <App /> } />
        <Route path="signup" element={ <Signup /> } />
        <Route path="signin" element={ <Signin /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes >
    </BrowserRouter>
  )
}

export default PageRoutes