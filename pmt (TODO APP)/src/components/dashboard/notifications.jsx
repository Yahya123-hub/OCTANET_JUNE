import { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000); // Fetch notifications every 5 seconds

    return () => clearInterval(interval);
  }, [notifications]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/notifications/getnotis');
      const newNotifications = response.data;
      if (newNotifications.length > notifications.length) {
        setAlert('New Task Alert');
        //window.alert('You have a new notification'); 
        setTimeout(() => setAlert(null), 3000);
      }
      setNotifications(newNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const clearNotifications = async () => {
    try {
      await axios.delete('http://localhost:3001/api/notifications/clear');
      setNotifications([]);
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  return (
    <div className="flex flex-col py-10 lg:px-16 md:px-10 px-6 h-screen overflow-y-auto w-full">
      <h2 className="lg:text-3xl md:text-2xl text-xl">Notifications</h2>

      {alert && <div className="alert bg-blue-500 text-white p-4 mb-4">{alert}</div>}

      <button 
        onClick={clearNotifications} 
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded mb-4 self-end"
      >
        Clear Notifications
      </button>

      <table className="min-w-full bg-black">
        <thead>
          <tr>
            <th className="py-2">Task Title</th>
            <th className="py-2">Description</th>
            <th className="py-2">Pinged Time</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border">{notification.title}</td>
              <td className="py-2 px-4 border">{notification.description}</td>
              <td className="py-2 px-4 border">{new Date(notification.pingTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notifications;
