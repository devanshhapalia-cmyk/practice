import { openDB } from "idb";

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

const DB_NAME = "ExpenseDB";
const STORE_NAME = "expenses";

let dbPromise: any;

export function initDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, {
            keyPath: "id",
          });

          // optional indexes
          store.createIndex("by-category", "category");
          store.createIndex("by-date", "date");
        }
      },
    });
  }
  return dbPromise;
}

// Add / Update
export async function addExpense(expense: Expense) {
  const db = await initDB();
  await db.put(STORE_NAME, expense);
}

// Read all
export async function getExpenses(): Promise<Expense[]> {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
}

// Delete
export async function deleteExpenseById(id: string) {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
}

// Update
export async function updateExpense(expense: Expense) {
  const db = await initDB();
  await db.put(STORE_NAME, expense);
}

