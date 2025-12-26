"use strict";
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
    if (!dropdown)
        return;
    dropdown.innerHTML = "";
    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.text;
        dropdown.appendChild(option);
    });
}
function populateDropdownEdit(options) {
    const dropdown = document.getElementById("editCategory");
    if (!dropdown)
        return;
    dropdown.innerHTML = "";
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
    const input = document.getElementById("addCategory");
    if (!input)
        return;
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
    window.location.href = "index.html";
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
    const legendDiv = document.getElementById("chartLegend");
    if (!canvas || !legendDiv)
        return;
    const ctx = canvas.getContext("2d");
    if (!ctx)
        return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    legendDiv.innerHTML = "";
    if (data.length === 0) {
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#999";
        ctx.fillText("No expenses for this month", canvas.width / 2, canvas.height / 2);
        return;
    }
    const centerX = canvas.width / 2.5;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 3;
    const total = data.reduce((sum, item) => sum + item.total, 0);
    let currentAngle = -Math.PI / 2;
    const colors = [];
    data.forEach((item, index) => {
        const sliceAngle = (item.total / total) * 2 * Math.PI;
        const hue = (index * 360) / data.length;
        const color = `hsl(${hue}, 70%, 60%)`;
        colors.push(color);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
        const textAngle = currentAngle + sliceAngle / 2;
        const textX = centerX + Math.cos(textAngle) * (radius * 0.65);
        const textY = centerY + Math.sin(textAngle) * (radius * 0.65);
        const percentage = ((item.total / total) * 100).toFixed(1);
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${percentage}%`, textX, textY);
        currentAngle += sliceAngle;
    });
    legendDiv.innerHTML = "<h3>Category</h3>";
    data.forEach((item, index) => {
        const legendItem = document.createElement("div");
        legendItem.className = "legend-item";
        const percentage = ((item.total / total) * 100).toFixed(1);
        legendItem.innerHTML = `
      <span class="legend-color" style="background-color: ${colors[index]}"></span>
      <span class="legend-text">${item.category}: ₹${item.total.toFixed(2)} (${percentage}%)</span>
    `;
        legendDiv.appendChild(legendItem);
    });
}
window.onload = () => {
    populateDropdown(categoryArray);
    populateDropdownEdit(categoryArray);
    populateCategoryFilter();
    displayExpenses();
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
        event.preventDefault();
        const amount = parseFloat(document.getElementById("inputExpense").value);
        const discription = document.getElementById("inputDiscription").value;
        const category = document.getElementById("inputCategory").value;
        const date = document.getElementById("inputDate").value;
        if (!amount) {
            alert("Please fill amount");
            return;
        }
        if (!discription) {
            alert("Please fill disciption");
            return;
        }
        if (!category) {
            alert("Please fill category");
            return;
        }
        if (!date) {
            alert("Please fill date");
            return;
        }
        const expense = {
            amount,
            discription,
            category,
            date
        };
        saveExpenseToLocalStorage(expense);
        const myfrom = document.getElementById("myForm");
        myfrom.reset();
        window.location.href = "homePage.html";
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
    filteredExpenses.forEach((expense, index) => {
        const actualIndex = expenses.indexOf(expense);
        const expenseItem = document.createElement("div");
        expenseItem.className = "expense-item";
        expenseItem.innerHTML = `
      <div class="expense-details">
        <p><strong>${expense.category}</strong> - ₹${expense.amount}</p>
        <p>${expense.discription}</p>
        <p class="expense-date">${expense.date}</p>
      </div>
      <div class="expense-actions">
        <img src="/home/devanshhapalia/Desktop/Practice/personalExpenseTracker/download (2).png" onclick="editExpense(${actualIndex})">
        <img class="deleteBtn" src="/home/devanshhapalia/Desktop/Practice/personalExpenseTracker/download (1).png" onclick="deleteExpense(${actualIndex})">
      </div>
    `;
        expenseList.appendChild(expenseItem);
    });
}
//delete expense
function deleteExpense(index) {
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}
//edit expense 
function editExpense(index) {
    localStorage.setItem("editingIndex", index.toString());
    window.location.href = "editExpense.html";
}
function loadEditForm() {
    populateDropdownEdit(categoryArray);
    const editingIndex = localStorage.getItem("editingIndex");
    if (editingIndex === null) {
        console.error("No expense selected for editing");
        return;
    }
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    const index = parseInt(editingIndex);
    const expense = expenses[index];
    const inputAmount = document.getElementById("editAmount");
    const discriptionInput = document.getElementById("editDiscription");
    const categorySelect = document.getElementById("editCategory");
    const dateInput = document.getElementById("editDate");
    if (!inputAmount || !discriptionInput || !categorySelect || !dateInput) {
        console.error("One or more form elements not found");
        return;
    }
    inputAmount.value = expense.amount.toString();
    discriptionInput.value = expense.discription;
    categorySelect.value = expense.category;
    dateInput.value = expense.date;
    console.log("Edit form loaded successfully with category:", expense.category);
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
    window.location.href = "homePage.html";
}
