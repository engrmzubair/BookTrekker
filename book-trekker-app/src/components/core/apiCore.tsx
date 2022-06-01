import http from "../../services/httpService"
import { API } from '../../config';



export const getProduct = async (sortBy: string) => {
  try {
    return await http.get(`${API}/product?sortBy=${sortBy}&order=desc&limit=10`)

  } catch (error) { }
}

