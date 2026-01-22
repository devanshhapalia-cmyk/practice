import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'z6ujhdq0',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-01-20',
  token: 'skTdSBVqs9UkfJl0v6dXFNjObQSEylo7D69UTbyUXP5piDCETRhXpnCeGX6sdEQnQsdiq3tvZIDDdAGwsdDWYWAjSVOgScymtuYGl171OOL8dKpVYUnPeOrmU1ZVNHnCmt3vnHSEqJRzd8WZN211Ql4aThJGjvFgRhFCdgB7MiT6M35ntikA'
  // No token needed for public read access
});
export const fetchStaticText = async () => {
  const query = '*[_type == "staticText"]';
  return await client.fetch(query);
};

// Helper function to fetch all todos
export const fetchTodos = async () => {
  const query = '*[_type == "todo"] | order(createdAt desc)';
  return await client.fetch(query);
};


// Create a new todo
export const createTodo = async (todoData) => {
  return await client.create({
    _type: 'todo',
    ...todoData,
    createdAt: new Date().toISOString()
  });
};

// Update a todo
export const updateTodo = async (id, updates) => {
  // Remove undefined values from updates
  const cleanUpdates = Object.fromEntries(
    Object.entries(updates).filter(([_, v]) => v !== undefined)
  );
  
  return await client
    .patch(id)
    .set(cleanUpdates)
    .commit();
};

// Delete a todo
export const deleteTodoById = async (id) => {
  return await client.delete(id);
};