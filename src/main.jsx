import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/redux'

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
