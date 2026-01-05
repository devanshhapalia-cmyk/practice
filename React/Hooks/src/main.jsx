import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UseEffect from './UseEffect.jsx'
import UseRef from './UseRef.jsx'
import Timer from './Timer.jsx'
import WithoutCallbackExample from './WithoutCallbackExample.jsx'
import WithCallbackExample from './WithCallbackExample.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <UseEffect></UseEffect>
    <UseRef></UseRef>
    <Timer></Timer>
    <WithoutCallbackExample></WithoutCallbackExample>
    <WithCallbackExample></WithCallbackExample>
  </StrictMode>,
)
