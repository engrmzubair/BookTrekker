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
export const fetchAllProducts = createAsyncThunk(
  'category/fetchAllProducts',
  async () => {
    const url = `${API}/product/all`
    const { data } = await http.get(url)
    return data;
  }
);
export const fetchProductById = createAsyncThunk(
  'category/fetchProductById',
  async (productId: string) => {
    const url = `${API}/product/${productId}`
    const { data } = await http.get(url)
    return data;
  }
);
export const fetchRelatedProducts = createAsyncThunk(
  'category/fetchRelatedProducts',
  async (productId: string) => {
    const url = `${API}/product/related/${productId}`
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
  count?: number,
  quantity: number,
  category: {
    _id: string,
    name: string
  },
  shipping: boolean,
  createdAt: string,
  updatedAt: string,
  __v: 0
}

export interface ProductState {
  productsBySell: Product[] | undefined;
  allProducts: Product[] | undefined;
  productsByArrival: Product[] | undefined;
  productsBySearch: Product[] | undefined;
  relatedProducts: Product[] | undefined;
  statusSell: 'idle' | 'succeeded';
  statusArrival: 'idle' | 'succeeded';
  product: Product | undefined;
}


const initialState: ProductState = {
  productsByArrival: undefined,
  allProducts: undefined,
  productsBySell: undefined,
  productsBySearch: undefined,
  relatedProducts: undefined,
  product: undefined,
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
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.relatedProducts = action.payload;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
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

export const getProductsById = (state: RootState) => state.root.product.product;
export const getRelatedProducts = (state: RootState) => state.root.product.relatedProducts;
export const getAllProducts = (state: RootState) => state.root.product.allProducts;


export default productSlice.reducer;
