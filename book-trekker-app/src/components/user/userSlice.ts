import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { API } from '../../config';
import http from '../../services/httpService';

export interface UserState {
  currentUser: {

    _id: string;
    name: string;
    email: string;
    role: number,
    history: []
  } | undefined;
  userStatus: 'idle' | 'succeeded';
}


export interface User {
  _id: string;
  name: string;
  email: string;
  role: number,
  history: []
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


const initialState: UserState = {
  currentUser: undefined,
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
      .addCase(getProfile.fulfilled, (state, action) => {
        state.userStatus = 'succeeded';
        state.currentUser = action.payload;
      })

  }


});

export const { saveUser, removeUser } = userSlice.actions;


export const currentUser = (state: RootState) => state.root.user.currentUser;
export const userStatus = (state: RootState) => state.root.user.userStatus;


export default userSlice.reducer;
