import express from "express";
import { Todo } from "../models/tasks.js";

const router = express.Router();

// Get tasks count by month
router.get("/tasks-by-month", async (req, res) => {
  try {
    const tasksByMonth = await Todo.aggregate([
      { $group: { _id: { $month: "$dueDate" }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(tasksByMonth);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get tasks count by priority
router.get("/tasks-by-priority", async (req, res) => {
  try {
    const tasksByPriority = await Todo.aggregate([
      { $group: { _id: "$priority", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(tasksByPriority);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get tasks count by category
router.get("/tasks-by-category", async (req, res) => {
  try {
    const tasksByCategory = await Todo.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(tasksByCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get tasks count by completion status
router.get("/tasks-by-completion", async (req, res) => {
  try {
    const tasksByCompletion = await Todo.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(tasksByCompletion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
