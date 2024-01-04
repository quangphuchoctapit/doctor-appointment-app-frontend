import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';

const root = document.getElementById('root');
const rootElement = createRoot(root);

rootElement.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
