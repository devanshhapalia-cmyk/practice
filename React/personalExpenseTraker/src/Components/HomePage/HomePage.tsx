import { isFunctionExpression } from "typescript";
import "./HomePage.css";
import edit from "../../assets/download (2).png";
import deleteIcon from "../../assets/download (1).png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Chart, ArcElement, Tooltip, Legend, PieController } from "chart.js";
// import { addExpense, getExpenses, deleteExpenseById, updateExpense } from '../db/db';
// import { openDB } from "../db/db";
import { getExpenses } from "../db/db";
import {  deleteExpenseById } from "../db/db";
Chart.register(PieController, ArcElement, Tooltip, Legend);

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

function HomePage({ categories }) {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [errorDate, setErrorDate] = useState(""); // For date range validation
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  const [validationMessages, setValidationMessages] = useState({
    category: "",
    dateFrom: "",
    dateTo: "",
    search: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const handleClearDate = () => {
    setFromDate("");
    setToDate("");
    setErrorDate("");
    setValidationMessages({
      category: "",
      dateFrom: "",
      dateTo: "",
      search: "",
    });
    setSelectedCategory("");
    setSearchDescription("");
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);

    // Validate category
    if (!e.target.value) {
      setValidationMessages((prev) => ({
        ...prev,
        category: "Please select a category",
      }));
    } else {
      setValidationMessages((prev) => ({ ...prev, category: "" }));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchDescription(value);
    setCurrentPage(1);

    // Validate search
    if (!value.trim()) {
      setValidationMessages((prev) => ({
        ...prev,
        search: "Please enter a description to search",
      }));
    } else {
      setValidationMessages((prev) => ({ ...prev, search: "" }));
    }
  };

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromDate(value);

    if (toDate && value > toDate) {
      setToDate("");
      setErrorDate("To date cannot be before From date");
      setValidationMessages((prev) => ({ ...prev, dateFrom: "Invalid From date" }));
    } else {
      setErrorDate("");
      setValidationMessages((prev) => ({ ...prev, dateFrom: "" }));
    }
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToDate(value);

    if (fromDate && value < fromDate) {
      setErrorDate("To date cannot be before From date");
      setValidationMessages((prev) => ({ ...prev, dateTo: "Invalid To date" }));
    } else {
      setErrorDate("");
      setValidationMessages((prev) => ({ ...prev, dateTo: "" }));
    }
  };

  // async function getMonthCategoryData(year: number, month: number) {
  //   // Using IndexedDB
  //   const expenses: Expense[] = (await getExpenses()).map((exp: any) => ({
  //     ...exp,
  //     description: exp.description || exp.discription || "",
  //   }));

  //   const totals: Record<string, number> = {};

  //   expenses.forEach((exp) => {
  //     const d = new Date(exp.date);
  //     if (d.getFullYear() === year && d.getMonth() + 1 === month) {
  //       totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
  //     }
  //   });

  //   return Object.entries(totals).map(([category, total]) => ({
  //     category,
  //     total,
  //   }));
  // }
    async function getMonthCategoryData(
    year: number,
    month: number,
    filterCategory = selectedCategory,
    dateFrom = fromDate,
    dateTo = toDate,
    search = searchDescription
  ) {
    const expenses: Expense[] = (await getExpenses()).map((exp: any) => ({
      ...exp,
      description: exp.description || exp.discription || "",
    }));

    let filteredExpenses = expenses;

    if (filterCategory)
      filteredExpenses = filteredExpenses.filter(e => e.category === filterCategory);

    if (dateFrom)
      filteredExpenses = filteredExpenses.filter(e => e.date >= dateFrom);

    if (dateTo)
      filteredExpenses = filteredExpenses.filter(e => e.date <= dateTo);

    if (search)
      filteredExpenses = filteredExpenses.filter(e =>
        e.description.toLowerCase().includes(search.toLowerCase())
      );

    const totals: Record<string, number> = {};

    filteredExpenses.forEach((exp) => {
      const d = new Date(exp.date);
      if (d.getFullYear() === year && d.getMonth() + 1 === month) {
        totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
      }
    });

    return Object.entries(totals).map(([category, total]) => ({
      category,
      total,
    }));
  }


  let chartInstance: Chart | null = null;

  function drawChart(data: { category: string; total: number }[]) {
    const canvas = document.getElementById("categoryChart") as HTMLCanvasElement;
    const monthTotalDiv = document.getElementById("monthTotal") as HTMLDivElement;

    if (!canvas) return;

    const total = data.reduce((s, i) => s + i.total, 0);

    if (monthTotalDiv) {
      if (data.length === 0) {
        monthTotalDiv.innerHTML = `<p>No expenses for this month</p>`;
      } else {
        monthTotalDiv.innerHTML = `<h3>Total: ₹${total.toFixed(2)}</h3>`;
      }
    }

    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }

    if (data.length === 0) return;

    // Dynamic color generation
    const dynamicColors = data.map(
      () =>
        `hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(
          Math.random() * 50 + 50
        )}%, ${Math.floor(Math.random() * 30 + 50)}%)`
    );

    chartInstance = new Chart(canvas, {
      type: "pie",
      data: {
        labels: data.map((d) => d.category),
        datasets: [
          {
            data: data.map((d) => d.total),
            backgroundColor: dynamicColors,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.parsed || 0;
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ₹${value.toFixed(2)} (${percentage}%)`;
              },
            },
          },
        },
      },
    });
  }
  useEffect(() => {
    const monthInput = document.getElementById("monthSelector") as HTMLInputElement;
    if (!monthInput?.value) return;

    const [y, m] = monthInput.value.split("-").map(Number);

    const updateChart = async () => {
      const data = await getMonthCategoryData(y, m);
      drawChart(data);
    };

    updateChart();
  }, [selectedCategory, fromDate, toDate, searchDescription]);

  useEffect(() => {
    const monthInput = document.getElementById("monthSelector") as HTMLInputElement;
    if (!monthInput) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    monthInput.value = `${year}-${month.toString().padStart(2, "0")}`;
    
    // Handle async chart data
    const loadChart = async () => {
      const data = await getMonthCategoryData(year, month);
      drawChart(data);
    };
    loadChart();

    const handler = async () => {
      const [y, m] = monthInput.value.split("-").map(Number);
      const data = await getMonthCategoryData(y, m);
      drawChart(data);
    };

    monthInput.addEventListener("change", handler);
    return () => monthInput.removeEventListener("change", handler);
  }, []);

  useEffect(function populateCategoryFilter(): void {
    const filterSelect = document.getElementById("categoryFilter") as HTMLSelectElement;
    if (!filterSelect) return;

    filterSelect.innerHTML = "<option value=''>All Categories</option>";

    categories.forEach((a) => {
      const option = document.createElement("option");
      option.value = a.value;
      option.textContent = a.text;
      filterSelect.appendChild(option);
    });

    // Listen for category updates
    const handleCategoryUpdate = () => {
      filterSelect.innerHTML = "<option value=''>All Categories</option>";
      categories.forEach((a) => {
        const option = document.createElement("option");
        option.value = a.value;
        option.textContent = a.text;
        filterSelect.appendChild(option);
      });
    };

    window.addEventListener('categoryUpdated', handleCategoryUpdate);

    return () => {
      window.removeEventListener('categoryUpdated', handleCategoryUpdate);
    };
  }, [categories]);

useEffect(() => {
  (window as any).goToEdit = async (index: number) => {
    // localStorage (commented)
    // const expenses: Expense[] = JSON.parse(localStorage.getItem("expenses") || "[]");

    // IndexedDB
    const expenses: Expense[] = (await getExpenses()).map((exp: any) => ({
      ...exp,
      description: exp.description || exp.discription || "",
    }));

    if (index >= 0 && index < expenses.length) {
      // Store expense data in localStorage for immediate access
      localStorage.setItem("editingExpense", JSON.stringify(expenses[index]));
      localStorage.setItem("editingIndex", index.toString());

      // Navigate with expense ID in URL for better routing
      navigate(`/edit-expense/${expenses[index].id}`);
    }
  };

  (window as any).deleteExpense = async (index: number) => {
    //  localStorage (commented)
    // const expenses: Expense[] = JSON.parse(localStorage.getItem("expenses") || "[]");

    // ✅ IndexedDB
    const expenses: Expense[] = (await getExpenses()).map((exp: any) => ({
      ...exp,
      description: exp.description || exp.discription || "",
    }));

    if (index >= 0 && index < expenses.length) {
      await deleteExpenseById(expenses[index].id);

      await displayExpenses();

      const monthInput = document.getElementById("monthSelector") as HTMLInputElement;
      if (monthInput?.value) {
        const [y, m] = monthInput.value.split("-").map(Number);
        const data = await getMonthCategoryData(y, m);
        drawChart(data);
      }
    }
  };

  (window as any).changePage = (page: number) => {
    setCurrentPage(page);
    displayExpenses();
  };
}, []);


  async function displayExpenses(
    filterCategory: string = selectedCategory,
    dateFrom: string = fromDate,
    dateTo: string = toDate,
    search: string = searchDescription
  ): Promise<void> {
    const expenseList = document.getElementById("expenseList") as HTMLDivElement;
    if (!expenseList) return;

    // const expenses: Expense[] = JSON.parse(localStorage.getItem("expenses") || "[]").map(
    //   (exp: any) => ({
    //     ...exp,
    //     description: exp.description || exp.discription || "",
    //   })
    // );
const expenses: Expense[] = (await getExpenses()).map((exp) => ({
  ...exp,
  description: exp.description || (exp as any).discription || "",
}));

    let filteredExpenses = expenses;

    if (filterCategory) filteredExpenses = filteredExpenses.filter((e) => e.category === filterCategory);
    if (dateFrom && dateTo) filteredExpenses = filteredExpenses.filter((e) => e.date >= dateFrom && e.date <= dateTo);
    else if (dateFrom) filteredExpenses = filteredExpenses.filter((e) => e.date >= dateFrom);
    else if (dateTo) filteredExpenses = filteredExpenses.filter((e) => e.date <= dateTo);
    if (search) filteredExpenses = filteredExpenses.filter((e) => e.description.toLowerCase().includes(search.toLowerCase()));

    if (!filteredExpenses.length) {
      expenseList.innerHTML = "<p class='noExpense'>No expenses found</p>";
      return;
    }

    const itemsPerPage = 7;
    const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedExpenses = filteredExpenses.slice(startIndex, endIndex);

    let tableHTML = `
      <table>
        <thead>
          <tr>
            
            <th>Items</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
    `;

    paginatedExpenses.forEach((expense) => {
      const actualIndex = expenses.indexOf(expense);
     tableHTML += `
  <tr>
  <td data-label="Description">${expense.description}</td>
    <td data-label="Amount">₹${expense.amount}</td>
    
    <td data-label="Date">${expense.date}</td>
    <td data-label="Category">${expense.category}</td>
    <td data-label="Actions" class="expense-actions">
      <img src="${edit}" onclick="goToEdit(${actualIndex})" alt="Edit">
      <img src="${deleteIcon}" onclick="deleteExpense(${actualIndex})" alt="Delete">
    </td>
  </tr>
`;
    });

    tableHTML += `</tbody></table>`;

    if (totalPages > 1) {
      tableHTML += `
        <div class="pagination-controls" style="margin-top: 20px; text-align: center;">
          <button onclick="window.changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
          <span style="margin: 0 10px;">Page ${currentPage} of ${totalPages}</span>
          <button onclick="window.changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
        </div>
      `;
    }

    expenseList.innerHTML = tableHTML;
  }

  useEffect(() => {
    const loadExpenses = async () => {
      await displayExpenses();
    };
    loadExpenses();
  }, [currentPage, selectedCategory, fromDate, toDate, searchDescription]);

  // Initial load on mount
  useEffect(() => {
    const loadInitialExpenses = async () => {
      await displayExpenses();
    };
    loadInitialExpenses();
  }, []);

  return (
    <>
      <h1>Your Expenses</h1>

      <div className="filter-container">
         <label htmlFor="searchBar">Search:</label>
        <input type="text" id="searchBar" placeholder="search by description" value={searchDescription} onChange={handleSearchChange} />
        {validationMessages.search && <p style={{ color: "red" }}>{validationMessages.search}</p>}
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.text}</option>
          ))}
        </select>
        {validationMessages.category && <p style={{ color: "red" }}>{validationMessages.category}</p>}

        <label htmlFor="dateFrom">From:</label>
        <input type="date" id="dateFrom" value={fromDate} onChange={handleFromDateChange} max={today} />
        {validationMessages.dateFrom && <p style={{ color: "red" }}>{validationMessages.dateFrom}</p>}

        <label htmlFor="dateTo">To:</label>
        <input type="date" id="dateTo" value={toDate} onChange={handleToDateChange} min={fromDate} max={today} disabled={!fromDate} />
        {validationMessages.dateTo && <p style={{ color: "red" }}>{validationMessages.dateTo}</p>}

        <button id="clearDateBtn" onClick={handleClearDate}>Clear Dates</button>

        
      </div>
<div className="buttons">
  <button className="addExpenseButton" onClick={() => navigate("/add-expense")}>Add Expense</button>
        <button className="addCategoryButton" onClick={() => navigate("/add-category")}>Add Category</button>
</div>
      <div id="expenseList" className="expense-list"></div>
<div id="monthTotal" className="month-total"></div>
      <div className="chart-section">
        <h2>Monthly Category Breakdown</h2>
       <div className="monthSelect">
         <label htmlFor="monthSelector">Select Month:</label>
        <input type="month" id="monthSelector" />
       </div>
        
        <div id="chartContainer" className="chart-container">
          <canvas id="categoryChart"></canvas>
        </div>
      </div>
    </>
  );
}

export default HomePage;
