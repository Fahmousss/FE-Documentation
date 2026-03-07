import { combineReducers } from '@reduxjs/toolkit';
import persistedDarkModeReducer from './persisted/persisted-dark-mode-reducer';
import persistedLayoutReducer from './persisted/persisted-layout-reducer';
import NavbarSlice from './slice/navbar.slice'; // ganti dengan slice yang Anda buat
import SidebarSlice from './slice/sidebar.slice'; // ganti dengan slice yang Anda buat
import ThemeSlice from './slice/theme.slice'; // ganti dengan slice yang Anda buat

const rootReducer = combineReducers({
  sidebar: SidebarSlice,
  navbar: NavbarSlice,
  darkMode: persistedDarkModeReducer,
  applicationTheme: ThemeSlice,
  layout: persistedLayoutReducer,
});

export default rootReducer;
