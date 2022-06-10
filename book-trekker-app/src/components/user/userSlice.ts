import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { API } from '../../config';
import http from '../../services/httpService';


export interface User {
  _id: string;
  name: string;
  email: string;
  role: number,
  history: []
}

export interface UserState {
  currentUser: User | undefined;
  updatedUser: User | undefined;
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
export const updateUser = createAsyncThunk(
  'user/getProfile',
  async (userId, data) => {
    const url = `${API}/user/${userId}`
    const response = await http.get(url, data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


const initialState: UserState = {
  currentUser: undefined,
  updatedUser: undefined,
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
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updatedUser = action.payload;
      })

  }


});

export const { saveUser, removeUser } = userSlice.actions;


export const currentUser = (state: RootState) => state.root.user.currentUser;
export const userStatus = (state: RootState) => state.root.user.userStatus;


export default userSlice.reducer;
