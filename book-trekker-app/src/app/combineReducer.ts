import { combineReducers } from "@reduxjs/toolkit";
import userReducer from '../components/user/userSlice';
import categoryReducer from "../components/adminResource/category/categorySlice";

// export default rootReducer
export default combineReducers({
  user: userReducer,
  category: categoryReducer,
})
