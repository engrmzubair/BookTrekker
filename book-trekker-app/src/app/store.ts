import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer from './combineReducer';



export const store = configureStore({
  reducer: {
    root: rootReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
