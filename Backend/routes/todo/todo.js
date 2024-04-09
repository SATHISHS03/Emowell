import { Router } from "express";
import authmiddleware from "../../middleware/middleware.js";
import { Todo } from "../../Database/db.js"; // Adjust the import path as necessary

export const todo_router = Router();

// Add a new todo task
todo_router.post('/addtodo', authmiddleware, async (req, res) => {
  const { person_id, taskContent, column } = req.body;
  try {
    let userTodo = await Todo.findOne({ person_id });
    if (!userTodo) {
      userTodo = new Todo({ person_id, columns: { todo: [], inProgress: [], completed: [] } });
    }
    userTodo.columns[column].push({ id: taskContent.id, content: taskContent.content });
    await userTodo.save();
    res.json({ message: 'Task added successfully', userTodo });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add task', error });
  }
});

// Move a task between columns
todo_router.post('/move', authmiddleware, async (req, res) => {
  const { person_id, taskId, sourceColumn, destinationColumn } = req.body;

  try {
    const userTodo = await Todo.findOne({ person_id });
    if (!userTodo) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    // Find and remove the task from the source column
    const taskIndex = userTodo.columns[sourceColumn].findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found in source column.' });
    }
    const [task] = userTodo.columns[sourceColumn].splice(taskIndex, 1);

    // Add the task to the destination column
    userTodo.columns[destinationColumn].push(task);

    await userTodo.save();
    res.json({ message: 'Task moved successfully.', userTodo });
  } catch (error) {
    res.status(500).json({ message: 'Failed to move task.', error });
  }
});

// Delete a task
todo_router.delete('/deletetask', authmiddleware, async (req, res) => {
  const { person_id, taskId, sourceColumn } = req.body;

  try {
    const userTodo = await Todo.findOne({ person_id });
    if (!userTodo) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    // Find and remove the task from the source column
    const taskIndex = userTodo.columns[sourceColumn].findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found.' });
    }
    userTodo.columns[sourceColumn].splice(taskIndex, 1);

    await userTodo.save();
    res.json({ message: 'Task deleted successfully.', userTodo });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task.', error });
  }
});
