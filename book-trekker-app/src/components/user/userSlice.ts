import { createAsyncThunk, createSlice, PayloadAction, } from '@reduxjs/toolkit';
import { string } from 'yup';
import { RootState, AppThunk } from '../../app/store';
import { API } from '../../config';
import http from '../../services/httpService';


export interface User {
  _id: string;
  name: string;
  email: string;
  role: number,
  history: []
}

export interface Product {
  _id: string;
  name: string;
  count: number;
  price: number

}
export interface Order {
  _id: string;
  products: Product[]
  transaction_id: string;
  amount: number;
  address: string;
  status: string;
  user: { _id: string, name: string };
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  currentUser: User | undefined;
  updatedUser: User | undefined;
  purchaseHistory: Order[] | undefined;
  userStatus: 'idle' | 'succeeded';
}


export const getProfile = createAsyncThunk(
  'user/getProfile',
  async () => {
    const url = `${API}/user/me`
    const response = await http.get(url);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const getPurchaseHistory = createAsyncThunk(
  'get/purchaseHistory',
  async (userId: string) => {
    const url = `${API}/order/by/user/${userId}`
    const response = await http.get(url);
    return response.data;
  }
);
export const updateUser = createAsyncThunk(
  'updateUser',
  async ({ userId, data }: { userId: string, data: { name?: string, password?: string } }) => {

    const url = `${API}/user/${userId}`
    const res = await http.put(url, data);
    return res.data;
  }
);


const initialState: UserState = {
  currentUser: undefined,
  updatedUser: undefined,
  purchaseHistory: undefined,
  userStatus: 'idle'
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    saveUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },

    removeUser: (state) => {
      state.currentUser = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.userStatus = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(getPurchaseHistory.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.purchaseHistory = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.updatedUser = action.payload;
      })

  }


});

export const { saveUser, removeUser } = userSlice.actions;
export const currentUser = (state: RootState) => state.root.user.currentUser;
export const getUpdatedUser = (state: RootState) => state.root.user.updatedUser;
export const userStatus = (state: RootState) => state.root.user.userStatus;
export const getHistory = (state: RootState) => state.root.user.purchaseHistory;


export default userSlice.reducer;
