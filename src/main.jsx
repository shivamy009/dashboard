import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { RapierProvider } from '@react-three/rapier';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <RapierProvider> */}

    <App />

    {/* </RapierProvider> */}
  </StrictMode>,
)
