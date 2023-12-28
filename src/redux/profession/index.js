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
    updateProfessions: (state, data) => {
      state.items = [...state.items, data.payload];
    },
  },
});

export const { setProfessions, setKeyLabelPairs, updateProfessions } =
  ProfessionSlice.actions;
export default ProfessionSlice.reducer;
