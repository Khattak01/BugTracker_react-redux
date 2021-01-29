import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import bugReducer from './features/bugs'

import { combineReducers } from "redux";

const reducer = combineReducers({
  // here we will be adding reducers
  counter: counterReducer,
  bugs:bugReducer
});

export default configureStore({
  reducer,
});
