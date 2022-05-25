import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.interceptors.response.use(res => res, err => {

  const expectedError = err.response && err.response.status >= 400 && err.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error", err);
    toast.error('An unexpected error occur!', { theme: 'dark' })
  }

  return Promise.reject(err)
})

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  patch: axios.patch
}