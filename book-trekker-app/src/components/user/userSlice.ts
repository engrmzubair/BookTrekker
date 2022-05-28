import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import http from '../../services/httpService';
import { API } from '../../config';

export interface UserState {
  currentUser: {
    _id: string;
    name: string;
    email: string;
  } | undefined;
  profile: {

    _id: string;
    name: string;
    email: string;
    role: number,
    history: []
  } | undefined;
}


export interface User {
  _id: string;
  name: string;
  email: string;
}


export const getProfile = createAsyncThunk(
  'user/requestProfile',
  async () => {

    const response = await http.get(`${API}/user/profile/me`)

    return response.data;
  }
);


const initialState: UserState = {
  currentUser: undefined,
  profile: undefined,
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

  extraReducers(builder) {
    builder

      .addCase(
        getProfile.fulfilled,
        (state, action) => {
          state.profile = action.payload;
        })

  }
});

export const { saveUser, removeUser } = userSlice.actions;


export const currentUser = (state: RootState) => state.root.user.currentUser;
export const profile = (state: RootState) => state.root.user.profile;


export default userSlice.reducer;
