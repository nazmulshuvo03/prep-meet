import { createSlice } from "@reduxjs/toolkit";

const ProfessionSlice = createSlice({
  name: "profession",
  initialState: {
    items: [],
    professionKeyPairs: [],
    skillKeyPairs: [],
    experienceTypeKeyPairs: [],
  },
  reducers: {
    setProfessions: (state, action) => {
      state.items = action.payload;
    },
    setProfessionKeyPair: (state, action) => {
      const data = action.payload;
      const keypairs = [];
      const skillKeyPairs = [];
      const expTypesKeyPairs = [];

      data.forEach((item) => {
        keypairs.push({ key: item.id, label: item.name });
        item.skills.forEach((skill) =>
          skillKeyPairs.push({
            id: skill.id,
            label: skill.name,
            profession_id: skill.profession_id,
          })
        );
        item.experienceTypes.forEach((et) =>
          expTypesKeyPairs.push({
            id: et.id,
            label: et.name,
            profession_id: et.profession_id,
          })
        );
      });
      state.professionKeyPairs = keypairs;
      state.skillKeyPairs = skillKeyPairs;
      state.experienceTypeKeyPairs = expTypesKeyPairs;
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
  setProfessionKeyPair,
  updateProfessions,
  removeProfession,
  updateSkills,
  removeSkill,
  updateExperienceTypes,
  removeExperienceTypes,
} = ProfessionSlice.actions;
export default ProfessionSlice.reducer;
