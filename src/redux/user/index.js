import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    people: [],
  },
  reducers: {
    setProfile: (state, data) => {
      state.profile = data.payload;
    },
    setPeople: (state, data) => {
      state.people = data.payload;
    },
    updatePeople: (state, data) => {
      state.people = [...state.people, data.payload];
    },
  },
});

export const { setProfile, setPeople, updatePeople } = userSlice.actions;
export default userSlice.reducer;
