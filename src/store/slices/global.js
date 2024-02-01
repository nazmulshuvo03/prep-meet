import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    loading: false,
    dark: window.matchMedia("(prefers-color-scheme: dark)").matches,
    dashboardQuery: {},
  },
  reducers: {
    setLoading: (state, { payload = true } = {}) => {
      state.loading = payload;
    },
    setTheme: (state) => {
      state.dark = !state.dark;
    },
    setDashboardQuery: (state, data) => {
      state.dashboardQuery = data.payload;
    },
  },
});

export const { setLoading, setTheme, setDashboardQuery } = globalSlice.actions;
export const selectTheme = (state) => state.global.dark;
export const switchLoading = (state) => !state.global.switchLoading;

export default globalSlice.reducer;
