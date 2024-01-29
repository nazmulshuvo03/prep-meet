import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    loading: false,
    dark: window.matchMedia("(prefers-color-scheme: dark)").matches,
  },
  reducers: {
    setLoading: (state, { payload = true } = {}) => {
      state.loading = payload;
    },
    setTheme: (state) => {
      state.dark = !state.dark;
    },
  },
});

export const { setLoading, setTheme } = globalSlice.actions;
export const selectTheme = (state) => state.theme.dark;

export default globalSlice.reducer;
