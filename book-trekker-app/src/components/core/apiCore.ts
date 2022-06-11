import http from "../../services/httpService"
import { API } from '../../config';
import { Filter } from "./search/Shop";
import queryString from 'query-string'
import { Product } from "../user/userSlice";


export const fetchProductsBySearch = async (
  limit: number,
  skip: number,
  filters: Filter,

) => {

  return await http.post(`${API}/product/by/search`, { filters, limit, skip })

}

export const fetchAllProducts = async () => {

  return await http.get(`${API}/product`)
}
export const fetchProductById = async (productId: string) => {

  return await http.get(`${API}/product/${productId}`)
}

export const deleteProduct = async (productId: string, userId: string) => {

  return await http.delete(`${API}/product/${productId}/${userId}`)

}
export const updateProduct = async (productId: string, userId: string, product: Product) => {
  const url = `${API}/product/${productId}/${userId}`
  return await http.multipartPost(product, url)

}





type List = {
  search: string,
  category: string
};

export const fetchList = async (params: List) => {

  const query = queryString.stringify(params)
  console.log("query: ", query)

  return await http.get(`${API}/product/search?${query}`);

}

export const getBraintreeClientToken = async (userId: string) => {

  try {
    return await http.get(`${API}/braintree/getToken/${userId}`)
  } catch (error) {

  }
}
export const processPayment = async (userId: string, paymentData: any) => {

  try {
    return await http.post(`${API}/braintree/payment/${userId}`, paymentData)
  } catch (error) {

  }
}
export const createOrder = async (userId: string, orderData: any) => {

  try {
    return await http.post(`${API}/order/create/${userId}`, orderData)
  } catch (error) {

  }
}
export const getOrders = async (userId: string) => {

  try {
    return await http.get(`${API}/order/get/${userId}`)
  } catch (error) {

  }
}
export const getStatusValues = async (userId: string) => {

  try {
    return await http.get(`${API}/order/status-values/${userId}`)
  } catch (error) {

  }
}
export const updateStatus = async (orderId: string, userId: string, status: string) => {

  try {
    return await http.put(`${API}/order/${orderId}/status/${userId}`, { status })
  } catch (error) {

  }
}

