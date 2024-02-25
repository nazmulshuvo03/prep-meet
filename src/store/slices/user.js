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
    updateProfile: (state, action) => {
      const data = action.payload;
      const updatedProfile = { ...state.profile };

      Object.keys(data).forEach((key) => {
        if (state.profile[key] !== data[key]) {
          updatedProfile[key] = data[key];
        }
      });
      state.profile = updatedProfile;
    },
    setPeople: (state, data) => {
      state.people = data.payload;
    },
    updatePeople: (state, data) => {
      state.people = [...state.people, { ...data.payload }];
    },
    updateWorkExperience: (state, action) => {
      const data = action.payload;
      let newData = state.profile;
      newData.workExperiences = [...newData.workExperiences, data];
      state.profile = newData;
    },
    removeWorkExperience: (state, action) => {
      const id = action.payload;
      let newData = state.profile;
      newData.workExperiences = newData.workExperiences.filter(
        (work) => work.id !== id
      );
      state.profile = newData;
    },
    updateEducation: (state, action) => {
      const data = action.payload;
      let newData = state.profile;
      newData.education = [...newData.education, data];
      state.profile = newData;
    },
    removeEducation: (state, action) => {
      const id = action.payload;
      let newData = state.profile;
      newData.education = newData.education.filter((work) => work.id !== id);
      state.profile = newData;
    },
  },
});

export const {
  setProfile,
  updateProfile,
  setPeople,
  updatePeople,
  updateWorkExperience,
  removeWorkExperience,
  updateEducation,
  removeEducation,
} = userSlice.actions;
export default userSlice.reducer;
