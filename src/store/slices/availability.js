import { createSlice } from "@reduxjs/toolkit";

const availabilitySlice = createSlice({
  name: "availability",
  initialState: {
    userAvailabilities: null,
  },
  reducers: {
    setUserAvailabilities: (state, data) => {
      state.userAvailabilities = data.payload;
    },
  },
});

export const { setUserAvailabilities } = availabilitySlice.actions;
export default availabilitySlice.reducer;
