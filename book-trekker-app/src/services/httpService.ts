import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



//intercept response object for global error handling
axios.interceptors.response.use(res => res, err => {

  const expectedError = err.response && err.response.status >= 400 && err.response.status < 500;

  //unexpected error
  if (!expectedError) {
    console.log("Logging the error", err);
    toast.error('An unexpected error occur!', { theme: 'dark' })
  }
  //expected error
  if (err.response && err.response.data && err.response.data.message)
    toast.error(err.response.data.message, { theme: 'dark' })
  return Promise.reject(err)
})

//intercept request object for set token in header
axios.interceptors.request.use(req => {

  const token = localStorage.getItem('bookTrekker_token');

  if (token && req.headers)
    req.headers.authorization = `Bearer ${token}`;
  return req
})

const multipartPost = (values: any, url: string) => {
  return axios({
    method: 'post',
    url,
    data: values,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export default {
  multipartPost,
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  patch: axios.patch
}