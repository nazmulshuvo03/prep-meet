import { createSlice } from "@reduxjs/toolkit";

const meetingSlice = createSlice({
  name: "meeting",
  initialState: {
    userMeetings: [],
    details: null,
  },
  reducers: {
    setUserMeetings: (state, data) => {
      state.userMeetings = data.payload;
    },
    setMeetingDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { setUserMeetings, setMeetingDetails } = meetingSlice.actions;
export default meetingSlice.reducer;
