import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  TicketData: [],
  LoggedInStatus: false,
  currentUserRole: 0,
  ShowVerification: false,
  VerificationData: { email_verified: false, phone_verified: false },
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
    updateCurrentUserRole: (state, action) => {
      state.currentUserRole = action.payload;
    },
    updateShowVerification: (state, action) => {
      state.ShowVerification = action.payload;
    },
    updateVerificationData: (state, action) => {
      state.VerificationData = action.payload;
    },
  },
});

export const {
  updateTicketData,
  updateLoggedInStatus,
  updateCurrentUserRole,
  updateShowVerification,
  updateVerificationData,
} = DataSlice.actions;

export default DataSlice.reducer;
