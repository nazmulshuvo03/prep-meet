import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    dark: window.matchMedia("(prefers-color-scheme: dark)").matches,
  },
  reducers: {
    setTheme: (state) => {
      state.dark = !state.dark;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const selectTheme = (state) => state.theme.dark;

export default themeSlice.reducer;
