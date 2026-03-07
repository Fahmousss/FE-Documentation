import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node } from '@xyflow/react';

interface INodesDiagramState {
  nodes: Node[];
}

const initialState: INodesDiagramState = {
  nodes: [],
};

const NodesDiagramSlice = createSlice({
  name: 'nodesDiagram',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    deleteNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter((node) => node.id !== action.payload);
    },
    updateNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    updateNode: (state, action: PayloadAction<Node>) => {
      const nodes = state.nodes.filter((node) => node.id !== action.payload.id);
      const updatedNodes = [...nodes, action.payload];
      state.nodes = updatedNodes;
    },
  },
});

export const { addNode, deleteNode, updateNodes, updateNode } = NodesDiagramSlice.actions;

export default NodesDiagramSlice.reducer;
