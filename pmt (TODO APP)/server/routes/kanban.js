import express from "express";
import { BacklogTask, PendingTask, TodoTask, DoingTask, DoneTask } from "../models/kanban_tasks.js";

const router = express.Router();

router.post('/save-tasks', async (req, res) => {
  try {
    const { backlogTasks, pendingTasks, todoTasks, doingTasks, doneTasks } = req.body;

    // Clear existing tasks
    await BacklogTask.deleteMany({});
    await PendingTask.deleteMany({});
    await TodoTask.deleteMany({});
    await DoingTask.deleteMany({});
    await DoneTask.deleteMany({});

    // Save new tasks
    await BacklogTask.insertMany(backlogTasks);
    await PendingTask.insertMany(pendingTasks);
    await TodoTask.insertMany(todoTasks);
    await DoingTask.insertMany(doingTasks);
    await DoneTask.insertMany(doneTasks);

    res.status(200).send('Tasks saved successfully');
  } catch (error) {
    res.status(500).send('Error saving tasks');
  }
});

router.get('/fetch-tasks', async (req, res) => {
  try {
    const backlogTasks = await BacklogTask.find({});
    const pendingTasks = await PendingTask.find({});
    const todoTasks = await TodoTask.find({});
    const doingTasks = await DoingTask.find({});
    const doneTasks = await DoneTask.find({});

    res.status(200).json({ backlogTasks, pendingTasks, todoTasks, doingTasks, doneTasks });
  } catch (error) {
    res.status(500).send('Error fetching tasks');
  }
});

export default router;
