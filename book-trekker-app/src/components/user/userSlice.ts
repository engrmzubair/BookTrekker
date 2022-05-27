import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UserState {
  user: {
    currentUser: {
      _id: string;
      name: string;
      email: string;
    } | undefined;
  }
}

type User = {
  _id: string;
  name: string;
  email: string;
}

const initialState: UserState = {
  user: { currentUser: undefined }
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    saveUser: (state, action: PayloadAction<User>) => {
      state.user.currentUser = action.payload;
    },
    removeUser: (state) => {
      state.user.currentUser = undefined;
    },
  },

});

export const { saveUser, removeUser } = userSlice.actions;


export const currentUser = (state: RootState) => state.user.user.currentUser;


export default userSlice.reducer;
