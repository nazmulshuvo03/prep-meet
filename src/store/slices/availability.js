import { createSlice } from "@reduxjs/toolkit";

const availabilitySlice = createSlice({
  name: "availability",
  initialState: {
    userAvailabilities: [],
  },
  reducers: {
    setUserAvailabilities: (state, data) => {
      state.userAvailabilities = data.payload;
    },
    updateUserAvailabilities: (state, data) => {
      state.userAvailabilities = [...state.userAvailabilities, data.payload];
    },
    removeAvailability: (state, data) => {
      const payload = data.payload;
      const filterValues = {
        userId: payload.userId,
        day: payload.day.toString(),
        hour: payload.hour,
      };
      state.userAvailabilities = state.userAvailabilities.filter((obj) => {
        return !Object.entries(filterValues).every(
          ([key, value]) => obj[key] === value
        );
      });
    },
    updateAvailabilityState: (state, data) => {},
  },
});

export const {
  setUserAvailabilities,
  updateUserAvailabilities,
  removeAvailability,
  updateAvailabilityState,
} = availabilitySlice.actions;
export default availabilitySlice.reducer;
