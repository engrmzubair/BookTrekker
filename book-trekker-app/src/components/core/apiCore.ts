import http from "../../services/httpService"
import { API } from '../../config';
import { Filter } from "./search/Shop";
import queryString from 'query-string'


export const fetchProductsBySearch = async (
  limit: number,
  skip: number,
  filters: Filter,

) => {

  return await http.post(`${API}/product/by/search`, { filters, limit, skip })

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

