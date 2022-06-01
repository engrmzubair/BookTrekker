import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { API } from '../../../config';
import http from '../../../services/httpService'


export const getCategories = createAsyncThunk(
  'category/getCategories',
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

    // categoryById: (state, action: PayloadAction<Category>) => {
    //   state.currentUser = action.payload;
    // },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;

      })
      .addCase(getCategories.rejected, (state) => {
        state.status = 'failed';
      });

  },

});

// export const { saveUser, removeUser } = userSlice.actions;


export const status = (state: RootState) => state.root.category.status;

export const categoryById = (id: string) => (state: RootState) => {
  const categories = state.root.category.categories;
  return categories?.find(c => c._id === id)
}

export const categories = (state: RootState) => state.root.category.categories;


export default categorySlice.reducer;
