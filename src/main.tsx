import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './view/app'

import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
