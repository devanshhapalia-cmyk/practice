import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCategory.css";

interface Category {
  value: string;
  text: string;
}

function AddCategory() {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setError("Please enter a category name");
      return;
    }

    // Get existing categories
    const categoryArray: Category[] = [
      { value: "Food", text: "Food" },
      { value: "Travel", text: "Travel" },
      { value: "Rent", text: "Rent" }
    ];

    const savedCategories = localStorage.getItem("categoryArray");
    if (savedCategories) {
      const loaded = JSON.parse(savedCategories);
      categoryArray.length = 0;
      categoryArray.push(...loaded);
    }

    // Check if category already exists
    const exists = categoryArray.some(
      (cat: Category) => cat.value.toLowerCase() === categoryName.toLowerCase()
    );
    if (exists) {
      setError("This category already exists");
      return;
    }

    // Add new category
    categoryArray.push({
      value: categoryName,
      text: categoryName,
    });

    // Save to localStorage
    localStorage.setItem("categoryArray", JSON.stringify(categoryArray));

    // Trigger custom event to notify all components about category update
    window.dispatchEvent(new CustomEvent('categoryUpdated', {
      detail: { categories: categoryArray }
    }));

    alert(`Category "${categoryName}" added!`);
    setCategoryName("");
    setError("");

    // Navigate back to home page
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <h1>Add New Category</h1>
      <form onSubmit={handleSubmit} id="categoryForm">
        <h2>Create a new expense category</h2>
        <label htmlFor="addCategory">Category Name:</label>
        <input
          type="text"
          id="addCategory"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          pattern="[a-zA-Z]+[0-9]*"
          placeholder="e.g., Entertainment"
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="form-buttons">
          <button type="submit" id="addCategoryBtn">
            Add Category
          </button>
          <button type="button" onClick={handleCancel} id="addCategoryBtn1">
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default AddCategory;