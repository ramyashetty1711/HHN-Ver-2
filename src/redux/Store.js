// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./DataSlice";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    data: DataSlice,
  },
});
