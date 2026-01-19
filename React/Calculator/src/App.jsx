import { lazy, Suspense } from "react";

import './App.css'
const Calculator = lazy(() => import("./Calculator.jsx"));
const Nested = lazy(() => import("./Nested.jsx"));

function App() {
  return (
    <>
   <Suspense fallback={<div>Loading...</div>}>
      <Calculator />
      <Nested />
    </Suspense>
    </>
  )
}

export default App
