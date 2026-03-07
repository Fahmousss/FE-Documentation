import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import NodesDiagramSlice from '../slice/nodes-diagram.slice';

const nodesDiagramPersistConfig = {
  key: 'diagram-nodes',
  storage, // Menggunakan localStorage sebagai storage
};

const persistedNodesDiagramReducer = persistReducer(nodesDiagramPersistConfig, NodesDiagramSlice);

export default persistedNodesDiagramReducer;
