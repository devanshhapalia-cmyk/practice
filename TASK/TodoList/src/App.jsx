
import './App.css'
import SearchBar from './Components/SearchBar'
import Header from './Components/Header'
import { Toaster } from 'react-hot-toast';
import { TodoProvider } from './Context/TodoContext';

function App() {
  return (
    <TodoProvider>
      <><Toaster position="top-center" reverseOrder={false} />
        <Header></Header>
        <SearchBar></SearchBar>
      </>
    </TodoProvider>
  )
}

export default App
