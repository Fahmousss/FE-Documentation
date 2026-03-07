import { ISidebar } from '@/shared/sidebar/utils/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISidebarState {
  show: boolean;
  isOpen: boolean;
  active: string[];
  activeSidebar: ISidebar | null;
  parentSidebar: ISidebar[];
}
const initialState: ISidebarState = {
  show: true,
  isOpen: true,
  active: [],
  activeSidebar: null,
  parentSidebar: [],
};

const SidebarSlice = createSlice({
  name: 'SidebarSlice',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setShowSidebar: (state, action) => {
      state.show = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setActiveSidebar: (state, action: PayloadAction<ISidebar>) => {
      state.activeSidebar = action.payload;
    },
    setParentSidebar: (state, action: PayloadAction<ISidebar[]>) => {
      state.parentSidebar = action.payload;
    },
    addParentSidebar: (state, action: PayloadAction<ISidebar>) => {
      state.parentSidebar.push(action.payload);
    },
  },
});

export const {
  setOpen,
  setShowSidebar,
  setActive,
  setActiveSidebar,
  setParentSidebar,
  addParentSidebar,
} = SidebarSlice.actions;

export default SidebarSlice.reducer;
