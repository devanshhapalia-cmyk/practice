import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddExpense.css";
import { addExpense } from "../db/db";
type Expense = {
  id: number;
  amount: number;
  discription: string;
  category: string;
  date: string;
};

type Category = {
  value: string;
  text: string;
};

type Props = {
  categories: Category[];
};

function AddExpense({ categories }: Props) {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [discription, setDiscription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // Listen for category updates
  useEffect(() => {
    const handleCategoryUpdate = () => {
      // Categories will be updated via props, but we can add any additional logic here
      console.log("Categories updated in AddExpense");
    };

    window.addEventListener("categoryUpdated", handleCategoryUpdate);

    return () => {
      window.removeEventListener("categoryUpdated", handleCategoryUpdate);
    };
  }, []);

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      alert("Please enter a category name");
      return;
    }

    // Get existing categories
    const categoryArray: Category[] = [
      { value: "Food", text: "Food" },
      { value: "Travel", text: "Travel" },
      { value: "Rent", text: "Rent" },
    ];

    const savedCategories = localStorage.getItem("categoryArray");
    if (savedCategories) {
      const loaded = JSON.parse(savedCategories);
      categoryArray.length = 0;
      categoryArray.push(...loaded);
    }

    // Check if category already exists
    const exists = categoryArray.some(
      (cat: Category) => cat.value.toLowerCase() === newCategory.toLowerCase()
    );
    if (exists) {
      alert("This category already exists");
      return;
    }

    // Add new category
    categoryArray.push({
      value: newCategory,
      text: newCategory,
    });

    // Save to localStorage
    localStorage.setItem("categoryArray", JSON.stringify(categoryArray));

    // Trigger custom event to notify all components about category update
    window.dispatchEvent(
      new CustomEvent("categoryUpdated", {
        detail: { categories: categoryArray },
      })
    );

    alert(`Category "${newCategory}" added!`);
    setNewCategory("");
  };

  const [errors, setErrors] = useState({
    amount: "",
    discription: "",
    category: "",
    date: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    let valid = true;
    const newErrors = { amount: "", discription: "", category: "", date: "" };

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
      valid = false;
    }

    if (!discription.trim()) {
      newErrors.discription = "Please enter a description";
      valid = false;
    }

    if (!category) {
      newErrors.category = "Please select a category";
      valid = false;
    }

    if (!date) {
      newErrors.date = "Please select a date";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    // Create expense with auto-generated id
    const expense: Expense = {
      id: crypto.randomUUID(), // generates unique id
      description: discription, // use correct field name
      amount: parseFloat(amount),
      category,
      date,
    };

    // Save to IndexedDB
    await addExpense(expense); // your IndexedDB function

    alert("Expense added!");

    // Reset form
    setAmount("");
    setDiscription("");
    setCategory("");
    setDate("");
    setErrors({ amount: "", discription: "", category: "", date: "" });

    // Navigate back to home page
    navigate("/");
  };

  const handleCancel = () => {
    // Clear localStorage editing data
    localStorage.removeItem("editingExpense");
    localStorage.removeItem("editingIndex");
    navigate("/");
  };
  return (
    <>
      <h1>Expense Tracker</h1>
      <form id="myForm" onSubmit={handleSubmit}>
        <h2>Add your expense details</h2>
        <label htmlFor="inputDiscription">Item:</label>
        <input
          type="text"
          id="inputDiscription"
          maxLength={50}
          value={discription}
          onChange={(e) => setDiscription(e.target.value)}
        />
        {errors.discription && (
          <p style={{ color: "red" }}>{errors.discription}</p>
        )}
        <label htmlFor="inputExpense">Amount:</label>
        <input
          type="number"
          id="inputExpense"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {errors.amount && <p style={{ color: "red" }}>{errors.amount}</p>}

        <label htmlFor="inputCategory">Category:</label>
        <select
          id="inputCategory"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">-- Select an option --</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.text}
            </option>
          ))}
        </select>
        {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}

        <label htmlFor="inputDate">Date:</label>
        <input
          type="date"
          id="inputDate"
          value={date}
          min="1970-01-01"
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}

        <div
          className="add-category-section"
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f5f5f5",
            borderRadius: "5px",
          }}
        >
          {/* <h4>Add New Category:</h4>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category"
              style={{ flex: 1, padding: "8px" }}
            />
            <button
              type="button"
              onClick={handleAddCategory}
              style={{
                padding: "8px 15px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              Add Category
            </button>
          </div> */}
        </div>

        <div className="buttons">
          <button type="submit" id="updateBtn">
            Add Expense
          </button>
          <button type="button" id="cancelBtn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default AddExpense;
