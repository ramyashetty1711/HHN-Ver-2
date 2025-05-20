import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  TicketData: [],
  LoggedInStatus: false,
  currentUserRole: 0,
  AddRaiseTicket: false,
  ShowVerification: false,
  VerificationData: { email_verified: false, phone_verified: false },
  visitorsCount:null,
  visitorsDataLoading:true
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
    updateAddRaiseTicket: (state, action) => {
      state.AddRaiseTicket = action.payload;
    },
    updateVisitorsCount:(state,action)=>{
      state.visitorsCount=action.payload
    },
    updateVisitorsDataLoading:(state,action)=>{
      state.visitorsDataLoading=action.payload
    }
  },
});

export const {
  updateTicketData,
  updateLoggedInStatus,
  updateCurrentUserRole,
  updateShowVerification,
  updateVerificationData,
  updateAddRaiseTicket, 
  updateVisitorsCount,
  updateVisitorsDataLoading
} = DataSlice.actions;

export default DataSlice.reducer;
