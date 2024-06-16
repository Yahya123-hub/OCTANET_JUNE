import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connection from "./db.js";
import userRoutes from "./routes/reg.js";
import authRoutes from "./routes/login.js";
import forgotpswd from "./routes/forgotpswd.js";
import resetpswd from "./routes/resetpswd.js";
import Todo_add from "./routes/todo_add.js";
import Todo_delete from "./routes/todo_delete.js";
import Todo_get from "./routes/todo_get.js";
import Todo_update from "./routes/todo_update.js";
import Todo_priority from "./routes/todo_getpriority.js";
import Todo_personal from "./routes/todo_getorg.js";
import Todo_work from "./routes/todo_work.js";
import Chart_data from "./routes/chartdata.js";
import Kanban from "./routes/kanban.js";
import Notifications from "./routes/notis.js";
import bodyParser from 'body-parser';
import axios from 'axios';
import Notification from './models/alerts.js'; 


// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Database connection
connection();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/reg", userRoutes);
app.use("/api/login", authRoutes);
app.use("/api/forgot-password", forgotpswd);  //int the actual file, if u use /forgotpassword then 
//youll have to append the dash from the forgotpswd api file too bozo
//the frontend call should include the full path, the dashes from this appuse and the one in the actual file
app.use("/api/reset-password", resetpswd);
app.use("/api/addtodo", Todo_add);
app.use("/api/updatetodo", Todo_update);
app.use("/api/gettodo", Todo_get);
app.use("/api/deletetodo", Todo_delete);
app.use("/api/todopriority", Todo_priority);
app.use("/api/todopersonal", Todo_personal);
app.use("/api/todowork", Todo_work);
app.use("/api/chart_data", Chart_data);
app.use("/api/kanban", Kanban);
app.use("/api/notifications", Notifications);


//api/notifications

app.use(bodyParser.json({ limit: '1000mb' })); // Adjust limit as per your requirement


// Define port
const port = process.env.PORT || 3001;

let timers = [];




const fetchTasks = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/kanban/fetch-tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return {};
  }
};

// Function to start timers for tasks
const startTimers = async () => {
  const { backlogTasks, pendingTasks, todoTasks, doingTasks, doneTasks } = await fetchTasks();
  const allTasks = [
    ...backlogTasks,
    ...pendingTasks,
    ...todoTasks,
    ...doingTasks,
    ...doneTasks
  ];

  clearTimers();

  allTasks.forEach(task => {
    const { title, description, deadline } = task;

    // Calculate the delay in milliseconds
    const delay = deadline * 30 * 1000;
    const timer = setTimeout(async () => {
      await insertNotification({ title, description, pingTime: new Date() });
    }, delay);

    timers.push(timer);
  });
};

// Function to clear timers
const clearTimers = () => {
  timers.forEach(timer => clearTimeout(timer));
  timers = [];
};

// Function to insert notification into the database
const insertNotification = async (notification) => {
  try {
    const newNotification = new Notification(notification);
    await newNotification.save();
  } catch (error) {
    console.error('Error inserting notification:', error);
  }
};

// Fetch tasks and start timers on server start
startTimers();

// Export timer functions
export { startTimers, clearTimers };
// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
