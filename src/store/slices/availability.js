import { createSlice } from "@reduxjs/toolkit";

const availabilitySlice = createSlice({
  name: "availability",
  initialState: {
    userAvailabilities: [],
    recurrentAvailabilities: [],
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
        id: payload.id,
      };
      state.userAvailabilities = state.userAvailabilities.filter((obj) => {
        return !Object.entries(filterValues).every(
          ([key, value]) => obj[key] === value
        );
      });
    },
    updateAvailabilityState: (state, data) => {},
    setRecurrentAvailabilities: (state, action) => {
      state.recurrentAvailabilities = action.payload;
    },
    updateRecurrentAvailabilities: (state, action) => {
      state.recurrentAvailabilities = [
        ...state.recurrentAvailabilities,
        action.payload,
      ];
    },
  },
});

export const {
  setUserAvailabilities,
  updateUserAvailabilities,
  removeAvailability,
  updateAvailabilityState,
  setRecurrentAvailabilities,
  updateRecurrentAvailabilities,
} = availabilitySlice.actions;
export default availabilitySlice.reducer;
