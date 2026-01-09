import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UseEffect from './UseEffect.jsx'
import UseRef from './UseRef.jsx'
import Timer from './Timer.jsx'
import WithoutCallbackExample from './WithoutCallbackExample.jsx'
import WithCallbackExample from './WithCallbackExample.jsx'
import CustomHooks from './CustomHook.jsx'
import CopyButton from './CustomCopyHook/CopyButton.jsx'
import ShoppingCart from './UseMemo.jsx/ShoppingCart.jsx'
import LoginForm from './Form/LoginForm.jsx'
import CheckSize from './WindowSize/CheckSize.jsx'
import UseDeferredHooks from './UseDeferredHooks.jsx'
import StatusBar from './StatusBar.jsx'
import UseId from './UseId.jsx'
import CheckForm from './CheckForm.jsx'
import EffectEvent from './EffectEvent.jsx'
import CheckoutForm from './CheckForm.jsx'
import StyleInjector from './StyleInjector.jsx'
import Search from './Search.jsx'
import OptimisticTodo from './OptimisticTodo.jsx'
import TodoApps from './TodoApps.jsx'
createRoot(document.getElementById('root')).render(
  <>
    <App />
    <UseEffect></UseEffect>
    <UseRef></UseRef>
    <Timer></Timer>
    <WithoutCallbackExample></WithoutCallbackExample>
    <WithCallbackExample></WithCallbackExample>
    <CustomHooks></CustomHooks>
    <CopyButton></CopyButton>
    <ShoppingCart></ShoppingCart>
    <LoginForm></LoginForm>
    <CheckSize></CheckSize>
    {/* <UseDeferredHooks></UseDeferredHooks> */}
    <StatusBar></StatusBar>
    <EffectEvent></EffectEvent>
    <UseId></UseId>
    <CheckoutForm/>
    <StyleInjector css={`
        .card {
          padding: 16px;
          background: #b0e0e6;
        }
      `} />

      <div className="card">Hello</div>
      <OptimisticTodo></OptimisticTodo>
      <Search></Search>
      <TodoApps></TodoApps>
  </>,
)
