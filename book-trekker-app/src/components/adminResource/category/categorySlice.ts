import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { API } from '../../../config';
import http from '../../../services/httpService'


export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    const url = `${API}/category/`
    const { data } = await http.get(url)
    return data;
  }
);


export interface CategoryState {
  categories: {
    _id: string;
    name: string;
  }[] | undefined;
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
}


export interface Category {
  _id: string;
  name: string;
}


const initialState: CategoryState = {
  categories: undefined,
  status: 'idle'
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {

    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories?.push(action.payload)
    },

  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;

      })


  },

});

export const { addCategory } = categorySlice.actions;


export const categoryStatus = (state: RootState) => state.root.category.status;

export const getCategoryById = (id: string) => (state: RootState) => {
  const categories = state.root.category.categories;
  return categories?.find(c => c._id === id)
}

export const getCategories = (state: RootState) => state.root.category.categories;


export default categorySlice.reducer;
