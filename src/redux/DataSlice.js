import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  TicketData: [],
  LoggedInStatus: false,
};

export const DataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateTicketData: (state, action) => {
      state.TicketData = action.payload;
    },
    updateLoggedInStatus: (state, action) => {
      state.LoggedInStatus = action.payload;
    },
  },
});

export const { updateTicketData, updateLoggedInStatus } = DataSlice.actions;

export default DataSlice.reducer;
