import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { useState, useEffect } from "react";

const Signup = () => {

  //before deployment, add a validation that the email is real and can receive reset pswd links--IMP
  //IMP
  //IMP
  const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 


	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:3001/api/reg";
			const { data: res } = await axios.post(url, data);
			window.alert(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
        setErrorMessageVisible(true); 
			}
		}
	};

  useEffect(() => {
    if (errorMessageVisible) {
      const timeoutId = setTimeout(() => {
        setErrorMessageVisible(false);
      }, 5000); 
      return () => clearTimeout(timeoutId);
    }
  }, [errorMessageVisible]);


  const handleGoogleSuccess = (credentialResponse) => {
    console.log('Google Sign-In Success:', credentialResponse);
    // Handle the Google sign-in response here
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign-In Failure:', error);
    // Handle the Google sign-in failure here
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <GoogleOAuthProvider clientId="">
      <div className="min-h-screen flex items-start justify-center">
        <div className="bg-dark p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-white">First Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your first name"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-white">Last Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your last name"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-white">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-white">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
              />

             <div className="mt-4 mb-4 flex items-center text-right">
              <input type="checkbox" className="h-4 w-4 text-blue-400 rounded mr-2" onChange={togglePasswordVisibility} />
              <label className="text-sm font-medium text-white">Show Password</label>
              <span className="flex-grow"></span>
            </div>

            {errorMessageVisible && (
                <div className="w-92 px-4 py-2 my-1 text-sm bg-red-600 text-white rounded text-center">
                  {error}
                </div>
              )}      
              </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-400 to-blue-600 w-full py-2 px-4 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Signup
            </button>
          </form>
          <div className="mt-6">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              text="signup_with"
              shape="pill"
              className="w-full flex justify-center py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700"
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
