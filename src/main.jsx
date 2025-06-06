import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Clarity from '@microsoft/clarity';

const projectId = "rv61d21r2n"

Clarity.init(projectId);


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>
)
