import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface INavbarState {
  showNavbar: boolean;
  navbarHeight: number | null;
  footerHeight: number | null;
}
const initialState: INavbarState = {
  showNavbar: true,
  navbarHeight: null,
  footerHeight: null,
};

const NavbarSlice = createSlice({
  name: 'NavbarSlice',
  initialState,
  reducers: {
    setShowNavbar: (state, action: PayloadAction<boolean>) => {
      state.showNavbar = action.payload;
    },
    setNavbarHeight: (state, action: PayloadAction<number>) => {
      state.navbarHeight = action.payload;
    },
    setFooterHeight: (state, action: PayloadAction<number>) => {
      state.footerHeight = action.payload;
    },
  },
});

export const { setShowNavbar, setNavbarHeight, setFooterHeight } = NavbarSlice.actions;

export default NavbarSlice.reducer;
