import express from "express";
import { Todo } from "../models/tasks.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const highPriorityTasks = await Todo.find({ priority: "High" });
    res.json(highPriorityTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
