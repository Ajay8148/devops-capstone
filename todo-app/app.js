const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: ' Todo API v3 Live  Running' });
});

// Get todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Health check (VERY IMPORTANT)
app.get('/health', (req, res) => {
  res.send("OK");
});

// Create todo
app.post('/todos', (req, res) => {
  const todo = req.body;

  if (!todo.task) {
    return res.status(400).json({ error: "Task required" });
  }

  todos.push(todo);
  res.status(201).json(todo);
});

// 🔥 START SERVER (MOST IMPORTANT FIX)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
