import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../slice/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      dispatch(login(username.trim()));
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Player Team Manager
          </h1>
          <p className="text-gray-500 mt-2">Sign in to access your dashboard</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
