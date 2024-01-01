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
    updateProfile: (state, data) => {
      const updatedProfile = { ...state.profile };

      Object.keys(data).forEach((key) => {
        if (state.profile[key] !== data.payload[key]) {
          updatedProfile[key] = data.payload[key];
        }
      });
      state.profile = updatedProfile;
    },
    setPeople: (state, data) => {
      state.people = data.payload;
    },
    updatePeople: (state, data) => {
      state.people = [...state.people, data.payload];
    },
  },
});

export const { setProfile, updateProfile, setPeople, updatePeople } =
  userSlice.actions;
export default userSlice.reducer;
