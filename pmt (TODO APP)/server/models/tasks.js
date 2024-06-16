import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    todo: String,
    isCompleted: Boolean,
    priority: { type: String, default: 'none' },
    organization: { type: String, default: 'none' },
    category: { type: String, default: 'none' },
    status: { type: String, default: 'none' },
    dueDate: Date,
  });
  
const Todo = mongoose.model('Todo', todoSchema);

export {Todo};
