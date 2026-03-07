import { COLOR_THEME } from '@/pages/layout/utils/constant';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IThemeState {
  id: string | null;
  theme: COLOR_THEME;
}
const initialState: IThemeState = {
  id: null,
  theme: COLOR_THEME.DEFAULT,
};

const ThemeSlice = createSlice({
  name: 'ThemeSlice',
  initialState,
  reducers: {
    setApplicationTheme: (state, action: PayloadAction<IThemeState>) => {
      state.id = action.payload.id;
      state.theme = action.payload.theme;
    },
  },
});

export const { setApplicationTheme } = ThemeSlice.actions;

export default ThemeSlice.reducer;
