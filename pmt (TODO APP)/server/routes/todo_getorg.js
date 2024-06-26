import express from "express";
import { Todo } from "../models/tasks.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await Todo.find({ organization: "Personal" });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
