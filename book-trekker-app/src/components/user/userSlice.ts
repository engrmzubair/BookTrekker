import { createAsyncThunk, createSlice, PayloadAction, } from '@reduxjs/toolkit';
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
    saveUpdatedUser: (state, action: PayloadAction<User>) => {
      state.updatedUser = action.payload;
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

export const { saveUser, removeUser, saveUpdatedUser } = userSlice.actions;


export const updateUser =
  (data: { name?: string, password?: string }): AppThunk =>
    async (dispatch, getState) => {

      const userId = getState().root.user.currentUser?._id;
      console.log("userId: ", userId)

      const url = `${API}/user/${userId}`
      try {
        const res = await http.put(url, data);

        if (res.data)
          dispatch(saveUpdatedUser(res.data))

      } catch (error) {
        console.log(error)
      }

    };


export const currentUser = (state: RootState) => state.root.user.currentUser;
export const getUpdatedUser = (state: RootState) => state.root.user.updatedUser;
export const userStatus = (state: RootState) => state.root.user.userStatus;


export default userSlice.reducer;
