import { useEffect, useState } from 'react'
import HomePage from './Components/HomePage/HomePage'
import AddExpense from './Components/AddExpense/AddExpense';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditExpense from './Components/EditExpense/EditExpense';
import AddCategory from './Components/AddCategory/AddCategory';

interface Category {
  value: string
  text: string
}

function App() {
  const [categories, setCategories] = useState<Category[]>([
    { value: 'Food', text: 'Food' },
    { value: 'Travel', text: 'Travel' },
    { value: 'Rent', text: 'Rent' }
  ])

  // Load from localStorage initially and listen for changes
  useEffect(() => {
    const loadCategories = () => {
      const saved = localStorage.getItem('categoryArray')
      if (saved) {
        setCategories(JSON.parse(saved))
      }
    }

    // Initial load
    loadCategories()

    // Listen for storage changes (for cross-tab updates)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'categoryArray') {
        loadCategories()
      }
    }

    // Custom event listener for same-tab updates
    const handleCategoryUpdate = () => {
      loadCategories()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('categoryUpdated', handleCategoryUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('categoryUpdated', handleCategoryUpdate)
    }
  }, [])
 
  return (
  <Router>
      <Routes>
        <Route path="/" element={<HomePage  categories={categories}/>} />
        <Route path="/add-expense" element={<AddExpense categories={categories} />} />
         <Route path="/edit-expense/:id" element={<EditExpense />} />
         <Route path="/add-category" element={<AddCategory />} />
      </Routes>
    </Router>)
}

export default App
