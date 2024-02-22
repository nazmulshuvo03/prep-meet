import { createSlice } from "@reduxjs/toolkit";

const ProfessionSlice = createSlice({
  name: "profession",
  initialState: {
    items: [],
    keyLabelPairs: [],
  },
  reducers: {
    setProfessions: (state, data) => {
      state.items = data.payload;
    },
    setKeyLabelPairs: (state, data) => {
      state.keyLabelPairs = data.payload;
    },
    updateProfessions: (state, action) => {
      const data = action.payload;
      const alreadyExists =
        state.items.length && state.items.some((s) => s.id === data.id);
      if (!alreadyExists) state.items.push(data);
    },
    removeProfession: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    updateSkills: (state, action) => {
      const data = action.payload;
      const professionToUpdate = state.items.find(
        (item) => item.id === data.profession_id
      );
      if (professionToUpdate) {
        const alreadyExists =
          professionToUpdate.skills &&
          professionToUpdate.skills.length &&
          professionToUpdate.skills.some((s) => s.id === data.id);
        if (!alreadyExists) professionToUpdate.skills.push(data);
      }
    },
    removeSkill: (state, action) => {
      const { id, profession } = action.payload;
      const professionToUpdate = state.items.find(
        (item) => item.id === profession
      );
      if (professionToUpdate) {
        professionToUpdate.skills = professionToUpdate.skills.filter(
          (skill) => skill.id !== id
        );
      }
    },
    updateExperienceTypes: (state, action) => {
      const data = action.payload;
      const professionToUpdate = state.items.find(
        (item) => item.id === data.profession_id
      );
      if (professionToUpdate) {
        const alreadyExists =
          professionToUpdate.experienceTypes &&
          professionToUpdate.experienceTypes.length &&
          professionToUpdate.experienceTypes.some((s) => s.id === data.id);
        if (!alreadyExists) professionToUpdate.experienceTypes.push(data);
      }
    },
    removeExperienceTypes: (state, action) => {
      const { id, profession } = action.payload;
      const professionToUpdate = state.items.find(
        (item) => item.id === profession
      );
      if (professionToUpdate) {
        professionToUpdate.experienceTypes =
          professionToUpdate.experienceTypes.filter((et) => et.id !== id);
      }
    },
  },
});

export const {
  setProfessions,
  setKeyLabelPairs,
  updateProfessions,
  removeProfession,
  updateSkills,
  removeSkill,
  updateExperienceTypes,
  removeExperienceTypes,
} = ProfessionSlice.actions;
export default ProfessionSlice.reducer;
