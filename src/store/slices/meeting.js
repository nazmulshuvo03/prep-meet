import { createSlice } from "@reduxjs/toolkit";

const meetingSlice = createSlice({
  name: "meeting",
  initialState: {
    userMeetings: [],
  },
  reducers: {
    setUserMeetings: (state, data) => {
      state.userMeetings = data.payload;
    },
  },
});

export const { setUserMeetings } = meetingSlice.actions;
export default meetingSlice.reducer;
