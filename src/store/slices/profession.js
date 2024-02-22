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
      state.items.push(action.payload);
    },
    removeProfession: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
});

export const {
  setProfessions,
  setKeyLabelPairs,
  updateProfessions,
  removeProfession,
} = ProfessionSlice.actions;
export default ProfessionSlice.reducer;
