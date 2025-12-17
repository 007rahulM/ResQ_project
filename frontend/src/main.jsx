import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// 1. IMPORT THE ROUTER
import { BrowserRouter } from 'react-router-dom' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. WRAP THE APP (This is the "Power Plug") */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)