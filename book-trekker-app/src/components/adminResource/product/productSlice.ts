import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { API } from '../../../config';
import http from '../../../services/httpService'


export const fetchProducts = createAsyncThunk(
  'category/fetchProducts',
  async (sortBy: "sold" | "createdAt") => {
    const url = `${API}/product?sortBy=${sortBy}&order=desc&limit=6`
    const { data } = await http.get(url)
    return data;
  }
);

export interface Product {

  photo: {
    publicId: string,
    url: string
  },
  _id: string,
  description: string,
  name: string,
  price: number,
  sold: number,
  category: {
    _id: string,
    name: string
  },
  createdAt: string,
  updatedAt: string,
  __v: 0
}

export interface ProductState {
  productsBySell: Product[] | undefined;
  productsByArrival: Product[] | undefined;
  productsBySearch: Product[] | undefined;
  statusSell: 'idle' | 'succeeded';
  statusArrival: 'idle' | 'succeeded';
}


const initialState: ProductState = {
  productsByArrival: undefined,
  productsBySell: undefined,
  productsBySearch: undefined,
  statusSell: 'idle',
  statusArrival: 'idle'
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

    addProductsBySearch: (state, action: PayloadAction<Product[]>) => {
      state.productsBySearch = action.payload
    }

  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.fulfilled, (state, action) => {

        if (action.meta.arg === "sold") {
          state.statusSell = 'succeeded';
          state.productsBySell = action.payload;
        }
        else {
          state.statusArrival = 'succeeded';
          state.productsByArrival = action.payload;
        }

      })

  },

});

export const { addProductsBySearch } = productSlice.actions;


export const productStatus = (state: RootState) => ({
  sellStatus: state.root.product.statusSell,
  arrivalStatus: state.root.product.statusArrival
})


export const getProducts = (sortBy: "sold" | "arrival") => (state: RootState) => {
  if (sortBy === "sold")
    return state.root.product.productsBySell
  return state.root.product.productsByArrival
}

export const getProductsBySearch = (state: RootState) => state.root.product.productsBySearch;


export default productSlice.reducer;
