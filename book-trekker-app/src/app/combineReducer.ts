import { combineReducers } from "@reduxjs/toolkit";
import userReducer from '../components/user/userSlice';
import counterReducer from "../components/counter/counterSlice";

// export default rootReducer
export default combineReducers({
  counter: counterReducer,
  user: userReducer
})
