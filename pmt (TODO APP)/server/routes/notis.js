import express from "express";
import Notification  from "../models/alerts.js"
import { startTimers, clearTimers } from '../index.js'; 


const router = express.Router();

router.get('/getnotis', async (req, res) => {
    try {
      const notifications = await Notification.find();
      res.json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).send('Error fetching notifications');
    }
  });

router.delete('/clear', async (req, res) => {
    try {
      await Notification.deleteMany({});
      clearTimers();
      startTimers();
      res.status(200).send({ message: 'Notifications cleared' });
    } catch (error) {
      res.status(500).send({ error: 'Error clearing notifications' });
    }
  });
  
  export default router;