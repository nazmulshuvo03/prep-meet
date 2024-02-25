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
  },
});

export const { setExperienceLevels, setPreparationStages, setCompanies } =
  staticSlices.actions;
export default staticSlices.reducer;
