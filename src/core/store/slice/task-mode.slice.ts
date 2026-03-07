import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaskModeState {
  mode: 'detail' | 'task';
}

const initialState: TaskModeState = {
  mode: 'detail',
};

const TaskModeSlice = createSlice({
  name: 'TaskModeState',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<'detail' | 'task'>) => {
      state.mode = action.payload;
    },
  },
});

export default TaskModeSlice.reducer;
export const { setMode } = TaskModeSlice.actions;
