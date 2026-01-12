// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './EditExpense.css'

// interface Expense {
//   id: string;
//   amount: number;
//   discription: string;
//   category: string;
//   date: string;
// }

// const categoryArray: { value: string; text: string }[] = [
//   { value: "Food", text: "Food" },
//   { value: "Travel", text: "Travel" },
//   { value: "Rent", text: "Rent" }
// ];

// // Load saved categories from localStorage
// const savedCategories = localStorage.getItem("categoryArray");
// if (savedCategories) {
//   const loaded = JSON.parse(savedCategories);
//   categoryArray.length = 0;
//   categoryArray.push(...loaded);
// }

// function EditExpense(){
//     const navigate = useNavigate();
//     const [amount, setAmount] = useState("");
//     const [discription, setDiscription] = useState("");
//     const [category, setCategory] = useState("");
//     const [date, setDate] = useState("");
//     const [editingIndex, setEditingIndex] = useState<number | null>(null);

//     // Load edit form data on component mount
//     useEffect(() => {
//         const editingIndexStr = localStorage.getItem("editingIndex");
//         const editingExpenseStr = localStorage.getItem("editingExpense");
        
//         if (!editingIndexStr || !editingExpenseStr) {
//             alert("No expense to edit");
//             navigate("/");
//             return;
//         }

//         const index = parseInt(editingIndexStr);
//         const expense: Expense = JSON.parse(editingExpenseStr);

//         setEditingIndex(index);
//         setAmount(expense.amount.toString());
//         setDiscription(expense.discription);
//         setCategory(expense.category);
//         setDate(expense.date);
//     }, [navigate]);

//     const updateExpense = () => {
//         if (editingIndex === null) {
//             alert("No expense to update");
//             return;
//         }

//         if (!amount || !discription || !category || !date) {
//             alert("Please fill all fields");
//             return;
//         }

//         const expenses: Expense[] = JSON.parse(localStorage.getItem("expenses") || "[]");
        
//         expenses[editingIndex] = {
//             id: expenses[editingIndex].id,
//             amount: parseFloat(amount),
//             discription,
//             category,
//             date
//         };

//         localStorage.setItem("expenses", JSON.stringify(expenses));
//         localStorage.removeItem("editingIndex");
//         localStorage.removeItem("editingExpense");
        
//         navigate("/");
//     };

//     const handleCancel = () => {
//         localStorage.removeItem("editingIndex");
//         localStorage.removeItem("editingExpense");
//         navigate("/");
//     };

//     const addNewCategory = () => {
//         const newCategoryName = prompt("Enter new category name:");
//         if (!newCategoryName || !newCategoryName.trim()) {
//           alert("Please enter a valid category name");
//           return;
//         }

//         // Get existing categories
//         const savedCategories = localStorage.getItem("categoryArray");
//         if (savedCategories) {
//           const loaded = JSON.parse(savedCategories);
//           categoryArray.length = 0;
//           categoryArray.push(...loaded);
//         }

//         // Check if category already exists
//         const exists = categoryArray.some(
//           (cat: Category) => cat.value.toLowerCase() === newCategoryName.toLowerCase()
//         );
//         if (exists) {
//           alert("This category already exists");
//           return;
//         }

//         // Add new category
//         categoryArray.push({
//           value: newCategoryName,
//           text: newCategoryName,
//         });

//         // Save to localStorage
//         localStorage.setItem("categoryArray", JSON.stringify(categoryArray));

//         alert(`Category "${newCategoryName}" added!`);
//     };

//     return (
//         <>
//             <h1>Edit Expense</h1>
//     <form id="editForm" onSubmit={(e) => { e.preventDefault(); updateExpense(); }}>
//         <h2>Update your expense details</h2>
//         <label htmlFor="editAmount">Amount:</label>
//         <input 
//             type="number" 
//             id="editAmount" 
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             required 
//         />

//         <label htmlFor="editDiscription">Item:</label>
//         <input 
//             type="text" 
//             id="editDiscription" 
//             value={discription}
//             maxLength={50}
//             onChange={(e) => setDiscription(e.target.value)}
//             required 
//         />

//         <label htmlFor="editCategory">Category:</label>
//         <select 
//             id="editCategory" 
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//         >
//             <option value="">-- Select an option --</option>
//             {categoryArray.map((cat) => (
//                 <option key={cat.value} value={cat.value}>
//                     {cat.text}
//                 </option>
//             ))}
//         </select>

//         <label htmlFor="editDate">Date:</label>
//         <input 
//             type="date" 
//             id="editDate" 
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required 
//         />

//         <button type="button" id="updateBtn" onClick={updateExpense}>Update Expense</button>
//         <button type="button" id="cancelBtn" onClick={handleCancel}>Cancel</button>
//         <button type="button" onClick={addNewCategory}>Add New Category</button>
//       </form>
//         </>
//     )
// }
// export default EditExpense;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditExpense.css";
import { getExpenses, updateExpense } from "../db/db";

interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface Category {
  value: string;
  text: string;
}

const categoryArray: Category[] = [
  { value: "Food", text: "Food" },
  { value: "Travel", text: "Travel" },
  { value: "Rent", text: "Rent" },
];

// Load saved categories
const savedCategories = localStorage.getItem("categoryArray");
if (savedCategories) {
  const loaded = JSON.parse(savedCategories);
  categoryArray.length = 0;
  categoryArray.push(...loaded);
}

function EditExpense() {
  const { id } = useParams(); // 👈 expense ID from URL
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const editingExpense = localStorage.getItem("editingExpense");
    const editingIndex = localStorage.getItem("editingIndex");

    if (editingExpense) {
      try {
        const expense = JSON.parse(editingExpense);
        setAmount(expense.amount.toString());
        setDescription(expense.description || expense.discription || "");
        setCategory(expense.category);
        setDate(expense.date);
        return;
      } catch (error) {
        console.error("Error parsing expense from localStorage:", error);
      }
    }

    if (!id) {
      alert("Invalid expense - No expense data found");
      navigate("/");
      return;
    }

    (async () => {
      try {
        const expenses = await getExpenses();
        const expense = expenses.find((e) => e.id === id);

        if (!expense) {
          alert("Expense not found in IndexedDB");
          navigate("/");
          return;
        }

        setAmount(expense.amount.toString());
        setDescription(expense.description || expense.discription || "");
        setCategory(expense.category);
        setDate(expense.date);
      } catch (error) {
        console.error("Error loading expense from IndexedDB:", error);
        alert("Error loading expense");
        navigate("/");
      }
    })();
  }, [id, navigate]);

  // Listen for category updates
  useEffect(() => {
    const handleCategoryUpdate = () => {
      // Reload categories when they are updated
      const savedCategories = localStorage.getItem("categoryArray");
      if (savedCategories) {
        const loaded = JSON.parse(savedCategories);
        categoryArray.length = 0;
        categoryArray.push(...loaded);
      }
    };

    window.addEventListener('categoryUpdated', handleCategoryUpdate);

    return () => {
      window.removeEventListener('categoryUpdated', handleCategoryUpdate);
    };
  }, []);

  const handleUpdate = async () => {
    if (!amount || !description || !category || !date) {
      alert("Please fill all fields");
      return;
    }

    try {
      const editingIndex = localStorage.getItem("editingIndex");
      
      if (editingIndex) {
        const index = parseInt(editingIndex);
        
        const expenses = await getExpenses();
        
        if (index >= 0 && index < expenses.length) {
          expenses[index] = {
            ...expenses[index],
            amount: parseFloat(amount),
            description,
            category,
            date,
          };
          
          for (let i = 0; i < expenses.length; i++) {
            await updateExpense(expenses[i]);
          }
          
          // Clear localStorage editing data
          localStorage.removeItem("editingExpense");
          localStorage.removeItem("editingIndex");
          
          alert("Expense updated successfully!");
          navigate("/");
          return;
        }
      }
      
      if (!id) {
        alert("Unable to update expense - No valid identifier found");
        return;
      }

      const updatedExpense: Expense = {
        id,
        amount: parseFloat(amount),
        description,
        category,
        date,
      };

      await updateExpense(updatedExpense);
      
      localStorage.removeItem("editingExpense");
      localStorage.removeItem("editingIndex");
      
      alert("Expense updated successfully!");
      navigate("/");
      
    } catch (error) {
      console.error("Error updating expense:", error);
      alert("Error updating expense. Please try again.");
    }
  };

  const handleCancel = () => {
    // Clear localStorage editing data
    localStorage.removeItem("editingExpense");
    localStorage.removeItem("editingIndex");
    navigate("/");
  };

  
  return (
    <>
      <h1>Edit Expense</h1>

      <form
        id="editForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        <h2>Update your expense details</h2>

        <label htmlFor="editAmount">Amount:</label>
        <input
          type="number"
          id="editAmount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label htmlFor="editDescription">Item:</label>
        <input
          type="text"
          id="editDescription"
          value={description}
          maxLength={50}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="editCategory">Category:</label>
        <select
          id="editCategory"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">-- Select an option --</option>
          {categoryArray.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.text}
            </option>
          ))}
        </select>

        <label htmlFor="editDate">Date:</label>
        <input
          type="date"
          id="editDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

       <div className="buttons">
         <button type="submit" id="updateBtn">
          Update Expense
        </button>
        <button type="button" id="cancelBtn" onClick={handleCancel}>
          Cancel
        </button>
       </div>
      </form>
    </>
  );
}

export default EditExpense;
