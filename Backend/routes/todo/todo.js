// Importing necessary modules
import { Router } from 'express';
import { Types } from 'mongoose';
import { Todo } from '../../Database/db.js';
import authMiddleware from '../../middleware/middleware.js';

export const todo_router = Router();

// Middleware to check if user is authenticated
todo_router.use(authMiddleware);

// Fetch Todo document for a user
todo_router.get('/', async (req, res) => {
  try {
    const userId = req.userId; // assuming _id is stored in req.user by authMiddleware
    const userTodo = await Todo.findOne({ person_id: userId });
    if (!userTodo) {
      return res.status(404).json({ message: "Todo document not found." });
    }
    res.json(userTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a task within a column
todo_router.patch('/updateTask/:taskId', async (req, res) => {
  const { content, column } = req.body;
  console.log(req.body,"body");
  try {
    const userId = req.userId;
    const update = { $set: { [`columns.${column}.$[elem].content`]: content } };
    const filter = { person_id: userId };
    const options = { arrayFilters: [{ "elem.id": req.params.taskId }] };

    const result = await Todo.updateOne(filter, update, options);
    if(result.matchedCount === 0) {
      return res.status(404).json({ message: "No matching task found." });
    }
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Move a task between columns
todo_router.patch('/moveTask', async (req, res) => {
  console.log(req.body,"body");
  const { taskId, sourceColumn, destColumn } = req.body;
  try {
    const userId = req.userId;
    const userTodo = await Todo.findOne({ person_id: userId });
    if (!userTodo) {
      return res.status(404).json({ message: "Todo document not found." });
    }

    // Extract task from source column
    const task = userTodo.columns[sourceColumn].id(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found in source column." });
    }

    // Remove from source and add to destination
    task.remove();
    userTodo.columns[destColumn].push(task);

    await userTodo.save();
    res.json({ message: "Task moved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Add a task to a specific column
todo_router.post('/addTask', async (req, res) => {
  
  const { content, column } = req.body;
  console.log(req.body,"body");
  try {
    const userId = req.userId;
    const newTask = { id: new Types.ObjectId(), content };

    const result = await Todo.findOneAndUpdate(
      { person_id: userId },
      { $push: { [`columns.${column}`]: newTask } },
      { new: true, upsert: true } // Creates a new document if no document matches the filter
    );

    if (!result) {
      return res.status(404).json({ message: "Todo document not found or failed to create." });
    }
    res.status(201).json({ message: "Task added successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Delete a task from a specific column
todo_router.delete('/deleteTask/:taskId', async (req, res) => {
  const { column } = req.query; // Expecting which column to delete from as a query parameter
  try {
    const userId = req.userId;
    const taskId = req.params.taskId;

    const result = await Todo.updateOne(
      { person_id: userId },
      { $pull: { [`columns.${column}`]: { id: taskId } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Task not found or already deleted." });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default todo_router;
