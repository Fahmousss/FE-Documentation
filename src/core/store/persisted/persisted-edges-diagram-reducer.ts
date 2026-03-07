import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import EdgesDiagramSlice from '../slice/edges-diagram.slice';

const edgesDiagramPersistConfig = {
  key: 'diagram-edges',
  storage, // Menggunakan localStorage sebagai storage
};

const persistedEdgesDiagramReducer = persistReducer(edgesDiagramPersistConfig, EdgesDiagramSlice);

export default persistedEdgesDiagramReducer;
