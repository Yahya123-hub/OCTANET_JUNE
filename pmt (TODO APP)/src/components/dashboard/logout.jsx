import { useHistory } from 'react-router-dom';

const Logout = () => {

    const nav = useHistory();

    const handleLogout = () => {
    localStorage.removeItem("token");
    nav.push('/signin'); 
    };

  return (
    <button
      onClick={handleLogout}
      className="bg-blue-500 text-white p-2 rounded mb-4"
    >
      Logout
    </button>
  );
};

export default Logout;
