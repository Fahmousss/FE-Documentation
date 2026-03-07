import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import DarkModeSlice from '../slice/dark-mode.slice';

const darkModePersistConfig = {
  key: 'dark-mode',
  storage,
};

const persistedDarkModeReducer = persistReducer(darkModePersistConfig, DarkModeSlice);

export default persistedDarkModeReducer;
