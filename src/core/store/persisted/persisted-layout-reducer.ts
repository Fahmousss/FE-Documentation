import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import LayoutSlice from '../slice/layout.slice';

const layoutPersistConfig = {
  key: 'layout',
  storage, // Menggunakan localStorage sebagai storage
};

const persistedLayoutReducer = persistReducer(layoutPersistConfig, LayoutSlice);

export default persistedLayoutReducer;
