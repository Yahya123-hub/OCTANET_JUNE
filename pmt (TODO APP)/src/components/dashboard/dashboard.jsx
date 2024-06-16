import ChartComponent from "./chart";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNotifications } from './notificationcontext';


const Dashboard = () => {

  const [totalTasks, setTotalTasks] = useState([]);
  const [highPriorityTasks, setHighPriorityTasks] = useState([]);
  const [personalTasks, setPersonalTasks] = useState([]);
  const [worktasks, setworktasks] = useState([]);
  const { notifications } = useNotifications();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalTasksResponse = await axios.get("http://localhost:3001/api/gettodo");
        setTotalTasks(totalTasksResponse.data.length);

        const highPriorityTasksResponse = await axios.get("http://localhost:3001/api/todopriority");
        setHighPriorityTasks(highPriorityTasksResponse.data.length);

        const personalTasksResponse = await axios.get("http://localhost:3001/api/todopersonal");
        setPersonalTasks(personalTasksResponse.data.length);

        const worktasksResponse = await axios.get("http://localhost:3001/api/todowork");
        setworktasks(worktasksResponse.data.length);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };



    fetchData();

  }, []);


  const chartLabels = ['Total Tasks', 'High Priority', 'Personal', 'Work'];
  const chartData = [
    { _id: 1, count: totalTasks },
    { _id: 2, count: highPriorityTasks },
    { _id: 3, count: personalTasks },
    { _id: 4, count: worktasks },
  ];

  return (
    <div className="flex flex-col py-10 lg:px-16 md:px10 px-6 h-screen overflow-y-auto w-full">
      <h2 className="lg:text-3xl md:text-2xl text-xl">
        Dash
        <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-transparent bg-clip-text">
          {""}board
        </span>

        {notifications.length > 0 && (
        <div className="alert bg-blue-500 text-white p-4 mb-4 rounded lg">
          {notifications.length} new notifications
        </div>
      )}

      </h2>

      <div className="md:flex md:space-x-8 py-6 ">
        <div className="flex flex-col rounded-md border md:w-[400px] w-[250px] h-[150px] md:p-8 p-4 justify-center">
          <h2>Total Tasks</h2>
          <p className="text-gray-500 mt-3">{totalTasks}</p>
        </div>
        <div className="flex flex-col rounded-md border md:w-[400px] w-[250px] h-[150px] md:p-8 p-4 justify-center md:mt-0 mt-4">
          <h2>High Priority Tasks</h2>
          <p className="text-gray-500 mt-3">{highPriorityTasks}</p>
        </div>
      </div>
      <div className="flex space-x-8 py-6 w-4/5">
        <div id="taskGraph" className="flex flex-col rounded-md border w-full p-8 justify-center">
          Tasks Graph
          <ChartComponent
            data={chartData}
            labels={chartLabels}
            title="Tasks"
          />
        </div>
      </div>
      <div className="md:flex md:space-x-8 py-6">
        <div className="flex flex-col rounded-md border  md:w-[400px] w-[250px] h-[200px] md:p-8 p-4 justify-center">
          <h2>Personal Tasks</h2>
          <p className="text-gray-500 mt-3">{personalTasks}</p>
        </div>
        <div className="flex flex-col rounded-md border md:w-[400px] w-[250px] h-[200px] md:p-8 p-4 justify-center md:mt-0 mt-4">
          <h2>Work Tasks</h2>
          <p className="text-gray-500 mt-3">{worktasks}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
