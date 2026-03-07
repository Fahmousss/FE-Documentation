import { DarkModeState, Mode } from '@/core/models/dark-mode.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: DarkModeState = {
  theme: (localStorage.getItem('theme') as Mode) || 'light',
  isDarkMode: false,
};

const DarkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Mode>) => {
      state.theme = action.payload;
      state.isDarkMode = action.payload === 'dark' ? true : false;
    },
  },
});

export default DarkModeSlice.reducer;
export const { setTheme } = DarkModeSlice.actions;
