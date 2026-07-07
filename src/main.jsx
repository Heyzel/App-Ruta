import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ProgresoProvider } from './context/ProgresoContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProgresoProvider>
        <App />
      </ProgresoProvider>
    </BrowserRouter>
  </StrictMode>,
)
