"use strict";
let chartInstance = null;
document.addEventListener("DOMContentLoaded", () => {
    const navAddExpense = document.getElementById("addExpenseButton");
    if (navAddExpense) {
        navAddExpense.addEventListener("click", function () {
            window.location.href = "../AddExpense/index.html";
        });
    }
    const navAddCategory = document.getElementById("addCategoryButton");
    if (navAddCategory) {
        navAddCategory.addEventListener("click", function () {
            window.location.href = "../AddCategory/addCategory.html";
        });
    }
});
const categoryArray = [
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
function populateDropdown(options) {
    const dropdown = document.getElementById("inputCategory");
    if (!dropdown) {
        console.warn("Dropdown 'inputCategory' not found on this page");
        return;
    }
    dropdown.innerHTML = "";
    // Add empty option
    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "Select a category";
    dropdown.appendChild(emptyOption);
    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.text;
        dropdown.appendChild(option);
    });
}
function populateDropdownEdit(options) {
    const dropdown = document.getElementById("editCategory");
    if (!dropdown) {
        console.warn("Dropdown 'editCategory' not found on this page");
        return;
    }
    dropdown.innerHTML = "";
    // Add empty option
    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "Select a category";
    dropdown.appendChild(emptyOption);
    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.text;
        dropdown.appendChild(option);
    });
}
function populateCategoryFilter() {
    const filterSelect = document.getElementById("categoryFilter");
    if (!filterSelect)
        return;
    filterSelect.innerHTML = "<option value=''>All Categories</option>";
    categoryArray.forEach(a => {
        const option = document.createElement("option");
        option.value = a.value;
        option.textContent = a.text;
        filterSelect.appendChild(option);
    });
}
function addNewCategory() {
    const myForm = document.getElementById("categoryForm");
    const input = document.getElementById("addCategory");
    if (!input) {
        alert("Category input field not found");
        return;
    }
    const newCategoryName = input.value.trim();
    if (!newCategoryName) {
        alert("Please enter a category name");
        return;
    }
    const exists = categoryArray.some(a => a.value.toLowerCase() === newCategoryName.toLowerCase());
    if (exists) {
        alert("This category already exists");
        return;
    }
    categoryArray.push({
        value: newCategoryName,
        text: newCategoryName
    });
    localStorage.setItem("categoryArray", JSON.stringify(categoryArray));
    populateDropdown(categoryArray);
    populateDropdownEdit(categoryArray);
    populateCategoryFilter();
    input.value = "";
    alert(`Category "${newCategoryName}" added!`);
    window.location.href = "../HomePage/homePage.html";
}
function getMonthCategoryData(year, month) {
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    const categoryTotals = {};
    expenses.forEach(expense => {
        const expenseDate = new Date(expense.date);
        if (expenseDate.getFullYear() === year && expenseDate.getMonth() + 1 === month) {
            if (!categoryTotals[expense.category]) {
                categoryTotals[expense.category] = 0;
            }
            categoryTotals[expense.category] += expense.amount;
        }
    });
    return Object.entries(categoryTotals).map(([category, total]) => ({
        category,
        total
    }));
}
function drawChart(data) {
    const canvas = document.getElementById("categoryChart");
    const monthTotalDiv = document.getElementById("monthTotal");
    if (!canvas)
        return;
    const monthTotal = data.reduce((sum, item) => sum + item.total, 0);
    if (monthTotalDiv) {
        monthTotalDiv.innerHTML = `<h3>Total: ₹${monthTotal.toFixed(2)}</h3>`;
    }
    if (data.length === 0) {
        monthTotalDiv.innerHTML = `<h3>Total: ₹0.00</h3><p>No expenses for this month</p>`;
        if (chartInstance) {
            chartInstance.destroy();
            chartInstance = null;
        }
        return;
    }
    const labels = data.map(item => item.category);
    const amounts = data.map(item => item.total);
    const backgroundColors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
    ];
    const ctx = canvas.getContext('2d');
    if (chartInstance) {
        chartInstance.destroy();
    }
    chartInstance = new window.Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                    data: amounts,
                    backgroundColor: backgroundColors.slice(0, labels.length),
                    borderColor: '#fff',
                    borderWidth: 2
                }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 14
                        },
                        padding: 15,
                        color: '#333'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const percentage = ((value / monthTotal) * 100).toFixed(1);
                            return `${label}: ₹${value.toFixed(2)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}
window.onload = () => {
    // Populate dropdowns
    populateDropdown(categoryArray);
    populateDropdownEdit(categoryArray);
    populateCategoryFilter();
    displayExpenses();
    setTimeout(() => {
        populateDropdown(categoryArray);
        populateDropdownEdit(categoryArray);
        populateCategoryFilter();
    }, 100);
    const today = new Date();
    const monthSelector = document.getElementById("monthSelector");
    if (monthSelector) {
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        monthSelector.value = `${year}-${month}`;
        const data = getMonthCategoryData(today.getFullYear(), today.getMonth() + 1);
        drawChart(data);
        monthSelector.addEventListener("change", () => {
            const [selectedYear, selectedMonth] = monthSelector.value.split("-");
            const data = getMonthCategoryData(parseInt(selectedYear), parseInt(selectedMonth));
            drawChart(data);
        });
    }
    const filterSelect = document.getElementById("categoryFilter");
    const dateFromInput = document.getElementById("dateFrom");
    const dateToInput = document.getElementById("dateTo");
    const clearDateBtn = document.getElementById("clearDateBtn");
    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
        searchBar.addEventListener("input", (e) => {
            const searchDescription = e.target.value;
            const selectedCategory = filterSelect ? filterSelect.value : "";
            const fromDate = dateFromInput ? dateFromInput.value : "";
            const toDate = dateToInput ? dateToInput.value : "";
            displayExpenses(selectedCategory, fromDate, toDate, searchDescription);
        });
    }
    if (filterSelect) {
        filterSelect.addEventListener("change", (e) => {
            const selectedCategory = e.target.value;
            const fromDate = dateFromInput ? dateFromInput.value : "";
            const toDate = dateToInput ? dateToInput.value : "";
            const searchDescription = searchBar ? searchBar.value : "";
            displayExpenses(selectedCategory, fromDate, toDate, searchDescription);
        });
    }
    if (dateFromInput) {
        dateFromInput.addEventListener("change", () => {
            const selectedCategory = filterSelect ? filterSelect.value : "";
            const fromDate = dateFromInput.value;
            const toDate = dateToInput ? dateToInput.value : "";
            const searchDescription = searchBar ? searchBar.value : "";
            displayExpenses(selectedCategory, fromDate, toDate, searchDescription);
        });
    }
    if (dateToInput) {
        dateToInput.addEventListener("change", () => {
            const selectedCategory = filterSelect ? filterSelect.value : "";
            const fromDate = dateFromInput ? dateFromInput.value : "";
            const toDate = dateToInput.value;
            const searchDescription = searchBar ? searchBar.value : "";
            displayExpenses(selectedCategory, fromDate, toDate, searchDescription);
        });
    }
    if (clearDateBtn) {
        clearDateBtn.addEventListener("click", () => {
            if (dateFromInput)
                dateFromInput.value = "";
            if (dateToInput)
                dateToInput.value = "";
            const selectedCategory = filterSelect ? filterSelect.value : "";
            const searchDescription = searchBar ? searchBar.value : "";
            displayExpenses(selectedCategory, "", "", searchDescription);
        });
    }
};
const addExpenseButton = document.getElementById("addExpense");
if (addExpenseButton) {
    addExpenseButton.addEventListener("click", (event) => {
        const myFrom = document.getElementById("myForm");
        if (!myFrom.checkValidity()) {
            return;
        }
        event.preventDefault();
        const amount = parseFloat(document.getElementById("inputExpense").value);
        const discription = document.getElementById("inputDiscription").value;
        const category = document.getElementById("inputCategory").value;
        const date = document.getElementById("inputDate").value;
        const expense = {
            amount,
            discription,
            category,
            date
        };
        saveExpenseToLocalStorage(expense);
        const myfrom = document.getElementById("myForm");
        myfrom.reset();
        window.location.href = "../HomePage/homePage.html";
    });
}
else {
    console.error("Add Expense button not found!");
}
//save expense
function saveExpenseToLocalStorage(expense) {
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    console.log("Saved to localStorage:", expenses);
}
const expenseList = document.getElementById("expenseList");
function displayExpenses(filterCategory = "", dateFrom = "", dateTo = "", searchDescription = "") {
    if (!expenseList) {
        console.error("Expense list container not found");
        return;
    }
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    expenseList.innerHTML = "";
    let filteredExpenses = expenses;
    if (filterCategory) {
        filteredExpenses = filteredExpenses.filter(exp => exp.category === filterCategory);
    }
    if (dateFrom && dateTo) {
        filteredExpenses = filteredExpenses.filter(exp => exp.date >= dateFrom && exp.date <= dateTo);
    }
    else if (dateFrom) {
        filteredExpenses = filteredExpenses.filter(exp => exp.date >= dateFrom);
    }
    else if (dateTo) {
        filteredExpenses = filteredExpenses.filter(exp => exp.date <= dateTo);
    }
    if (filteredExpenses.length === 0) {
        expenseList.innerHTML = "<p class='noExpense'>No expenses found</p>";
        return;
    }
    if (searchDescription) {
        filteredExpenses = filteredExpenses.filter(exp => exp.discription.toLowerCase().includes(searchDescription.toLowerCase()));
    }
    if (filteredExpenses.length === 0) {
        expenseList.innerHTML = "<p class='noExpense'>No expenses found</p>";
        return;
    }
    let tableHTML = `
    <table>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Description</th>
          <th>Date</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
  `;
    filteredExpenses.forEach((expense, index) => {
        const actualIndex = expenses.indexOf(expense);
        tableHTML += `
      <tr>
        <td>₹${expense.amount}</td>
        <td>${expense.discription}</td>
        <td>${expense.date}</td>
          <td>${expense.category}</td>
        <td class="expense-actions">
          <img src="/home/devanshhapalia/Desktop/Practice/personalExpenseTracker/download (2).png" onclick="editExpense(${actualIndex})" alt="Edit">
          <img src="/home/devanshhapalia/Desktop/Practice/personalExpenseTracker/download (1).png" onclick="deleteExpense(${actualIndex})" alt="Delete">
        </td>
      </tr>
    `;
    });
    tableHTML += `
      </tbody>
    </table>
  `;
    expenseList.innerHTML = tableHTML;
}
//delete expense
function deleteExpense(index) {
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    if (index < 0 || index >= expenses.length) {
        alert("Invalid expense index");
        return;
    }
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
    const monthSelector = document.getElementById("monthSelector");
    if (monthSelector) {
        const [selectedYear, selectedMonth] = monthSelector.value.split("-");
        const data = getMonthCategoryData(parseInt(selectedYear), parseInt(selectedMonth));
        drawChart(data);
    }
}
//edit expense 
function editExpense(index) {
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    if (index < 0 || index >= expenses.length) {
        alert("Invalid expense index");
        return;
    }
    localStorage.setItem("editingIndex", index.toString());
    window.location.href = "../EditExpense/editExpense.html";
}
function loadEditForm() {
    populateDropdownEdit(categoryArray);
    const editingIndex = localStorage.getItem("editingIndex");
    if (!editingIndex)
        return;
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    const expense = expenses[Number(editingIndex)];
    const inputAmount = document.getElementById("editAmount");
    const descriptionInput = document.getElementById("editDiscription");
    const categorySelect = document.getElementById("editCategory");
    const dateInput = document.getElementById("editDate");
    inputAmount.value = expense.amount.toString();
    descriptionInput.value = expense.discription;
    dateInput.value = expense.date;
    const matchedOption = categoryArray.find(opt => opt.value === expense.category);
    categorySelect.value = matchedOption ? matchedOption.value : "";
    console.log("Selected category:", categorySelect.value);
}
function updateExpense() {
    const editingIndex = localStorage.getItem("editingIndex");
    if (editingIndex === null) {
        alert("No expense to update");
        return;
    }
    const index = parseInt(editingIndex);
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    const amount = parseFloat(document.getElementById("editAmount").value);
    const discription = document.getElementById("editDiscription").value;
    const category = document.getElementById("editCategory").value;
    const date = document.getElementById("editDate").value;
    if (!amount || !discription || !category || !date) {
        alert("Please fill all fields");
        return;
    }
    expenses[index] = {
        amount,
        discription,
        category,
        date
    };
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.removeItem("editingIndex");
    window.location.href = "../HomePage/homePage.html";
}
