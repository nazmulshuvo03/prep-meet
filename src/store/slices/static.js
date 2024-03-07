import { createSlice } from "@reduxjs/toolkit";

const staticSlices = createSlice({
  name: "static",
  initialState: {
    experienceLevels: null,
    preparationStages: null,
    companies: null,
  },
  reducers: {
    setExperienceLevels: (state, action) => {
      state.experienceLevels = action.payload;
    },
    setPreparationStages: (state, action) => {
      state.preparationStages = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    updateCompaniesState: (state, action) => {
      const data = action.payload;
      state.companies.push(data);
    },
  },
});

export const {
  setExperienceLevels,
  setPreparationStages,
  setCompanies,
  updateCompaniesState,
} = staticSlices.actions;
export default staticSlices.reducer;
