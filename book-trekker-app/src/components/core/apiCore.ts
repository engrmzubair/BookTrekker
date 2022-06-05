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
