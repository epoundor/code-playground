import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as StoreProvider } from "react-redux";
import App from './App.tsx'
import './index.css'
import store from "./stores/store";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
