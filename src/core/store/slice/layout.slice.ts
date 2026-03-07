import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Layout } from 'react-grid-layout';

export type DisplayType = 'table' | 'chart' | '';

export interface CardConfiguration {
  title: string;
  subtitle: string;
  display: DisplayType;
}

export interface LayoutEID extends Layout, CardConfiguration {}

export interface ILayout {
  id: string;
  name: string;
  layout: LayoutEID[];
  hiddenLayout: LayoutEID[];
}

export interface ILayoutState {
  list: ILayout[];
}

const initialState: ILayoutState = {
  list: [],
};

let layoutIdCounter = 0;
const generateLayoutId = () => `layout-${Date.now()}-${layoutIdCounter++}`;

const LayoutSlice = createSlice({
  name: 'LayoutSlice',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<ILayout>) => {
      state.list = [...state.list, action.payload];
    },

    setLayout: (state, action: PayloadAction<{ idList: string; layout: LayoutEID[] }>) => {
      const selectedList = state.list.find((item) => item.id === action.payload.idList);
      if (!selectedList) return;
      selectedList.layout = action.payload.layout;
    },

    deleteList: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },

    addLayout: (state, action: PayloadAction<string>) => {
      const selectedList = state.list.find((item) => item.id === action.payload);
      if (!selectedList) return;

      const { layout, hiddenLayout } = selectedList;
      const length = layout.length + hiddenLayout.length;

      selectedList.layout = [
        ...layout,
        {
          i: generateLayoutId(),
          x: (length % 3) * 4,
          y: 0,
          w: 4,
          h: 6,
          title: `Title ${length + 1}`,
          subtitle: `Subtitle ${length + 1}`,
          display: '',
          resizeHandles: ['se'],
        },
      ];
    },

    deleteLayout: (state, action: PayloadAction<{ idList: string; idLayout: string }>) => {
      const selectedList = state.list.find((item) => item.id === action.payload.idList);
      if (!selectedList) return;

      const { layout, hiddenLayout } = selectedList;
      const deletedLayout = layout.find((item) => item.i === action.payload.idLayout);
      if (!deletedLayout) return;

      hiddenLayout.push(deletedLayout);
      layout.splice(layout.indexOf(deletedLayout), 1);
    },

    restoreLayout: (state, action: PayloadAction<{ idList: string; idLayout: string }>) => {
      const selectedList = state.list.find((item) => item.id === action.payload.idList);
      if (!selectedList) return;

      const { layout, hiddenLayout } = selectedList;
      const restoredLayout = hiddenLayout.find((item) => item.i === action.payload.idLayout);
      if (!restoredLayout) return;

      layout.push(restoredLayout);
      hiddenLayout.splice(hiddenLayout.indexOf(restoredLayout), 1);
    },

    setConfiguration: (
      state,
      action: PayloadAction<{
        nameList: string;
        idLayout: string;
        title: string;
        subtitle: string;
        display: DisplayType;
      }>
    ) => {
      const selectedList = state.list.find((item) => item.name === action.payload.nameList);
      if (!selectedList) return;

      const selectedLayout = selectedList.layout.find((item) => item.i === action.payload.idLayout);
      if (!selectedLayout) return;

      selectedLayout.title = action.payload.title;
      selectedLayout.subtitle = action.payload.subtitle;
      selectedLayout.display = action.payload.display;
    },
  },
});

export const {
  addList,
  deleteList,
  setLayout,
  addLayout,
  deleteLayout,
  restoreLayout,
  setConfiguration,
} = LayoutSlice.actions;

export default LayoutSlice.reducer;
