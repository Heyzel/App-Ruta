import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ProgresoProvider } from './context/ProgresoContext.jsx'
import { AudioProvider } from './context/AudioContext.jsx'
import { RecompensasProvider } from './context/RecompensasContext.jsx'

// RecompensasProvider va por dentro de AudioProvider porque usa playSfx para
// los sonidos de celebración.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProgresoProvider>
        <AudioProvider>
          <RecompensasProvider>
            <App />
          </RecompensasProvider>
        </AudioProvider>
      </ProgresoProvider>
    </BrowserRouter>
  </StrictMode>,
)
