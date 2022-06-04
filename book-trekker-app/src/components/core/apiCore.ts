import http from "../../services/httpService"
import { API } from '../../config';
import { Filter } from "./Shop";


export const fetchProductsBySearch = async (
  limit: number,
  skip: number,
  filters: Filter,

) => {

  return await http.post(`${API}/product/by/search`, { filters, limit, skip })

}
