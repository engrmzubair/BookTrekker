import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
// import { API } from '../../config';

export interface UserState {
  currentUser: {

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
  role: number,
  history: []
}



const initialState: UserState = {
  currentUser: undefined,
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


});

export const { saveUser, removeUser } = userSlice.actions;


export const currentUser = (state: RootState) => state.root.user.currentUser;


export default userSlice.reducer;
