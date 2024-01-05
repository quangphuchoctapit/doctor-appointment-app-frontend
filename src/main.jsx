import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './features/user'
import { combineReducers } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const reducer = combineReducers({
  user: userReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

const persistor = persistStore(store)

const root = document.getElementById('root');
const rootElement = createRoot(root);

rootElement.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor} isLoading={false}>
      <App />
    </PersistGate>
  </Provider>
  // {/* </React.StrictMode> */ }
);
