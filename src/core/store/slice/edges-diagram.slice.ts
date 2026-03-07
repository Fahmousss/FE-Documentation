import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Edge } from '@xyflow/react';

interface IEdgeDiagramState {
  edges: Edge[];
}

const initialState: IEdgeDiagramState = {
  edges: [],
};

const EdgeDiagramSlice = createSlice({
  name: 'edgeDiagram',
  initialState,
  reducers: {
    addEdge: (state, action: PayloadAction<Edge>) => {
      state.edges.push(action.payload);
    },
    deleteEdge: (state, action: PayloadAction<string>) => {
      state.edges = state.edges.filter((edge) => edge.id !== action.payload);
    },
    updateEdge: (state, action: PayloadAction<Edge>) => {
      const restEdge = state.edges.filter((edge) => edge.id !== action.payload.id);
      state.edges = [...restEdge, action.payload];
    },
  },
});

export const { addEdge, deleteEdge, updateEdge } = EdgeDiagramSlice.actions;

export default EdgeDiagramSlice.reducer;
