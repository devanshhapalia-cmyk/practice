import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RenderPattern from './RenderPattern.jsx'
import HOC from './HOC.jsx'
import ContainerPattern from './ContainerPattern.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <RenderPattern></RenderPattern>
     <HOC></HOC>
     ContianerPattern
    </>
  )
}

export default App
