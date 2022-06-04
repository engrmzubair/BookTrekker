import http from "../../services/httpService"
import { API } from '../../config';
import { addProductsBySearch } from "../adminResource/product/productSlice";

type Params = {
  order?: string,
  sortBy?: string,
  limit: number,
  skip: number,
  filters: { category: string[], price: number[] }
}

export const fetchProductsBySearch = async (filters: Params, dispatch: any) => {

  console.log(filters)

  const { data } = await http.post(`${API}/product/by/search`, filters)

  dispatch(addProductsBySearch(data.data));

}
