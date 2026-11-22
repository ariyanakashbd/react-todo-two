
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTasks,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheckCircle,
  FaGoogle,
} from "react-icons/fa";
import axios from "axios";

// backend API (D:\todo full backend — port 5000 এ চলছে)
const API_URL = "http://localhost:5000";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setError("");
    setSuccess("");
  };

  // Login Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const { email, password } = formData;

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/login`, { email, password });
      const data = res.data;

      if (!data.success) {
        setError(data.message);
        return;
      }

      setSuccess(data.message);
      navigate("/todo");
    } catch {
      setError("Backend-এ connect করা যাচ্ছে না। server চালু আছে কি?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-5 py-14">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-between bg-blue-600 p-12 text-white">

          <Link to="/" className="flex items-center gap-3">
            <div className="bg-white text-blue-600 p-3 rounded-xl">
              <FaTasks size={25} />
            </div>

            <h2 className="text-3xl font-bold">
              Task<span className="text-blue-200">Flow.</span>
            </h2>
          </Link>

          <div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Welcome Back!
              <br />
              Manage Your Tasks Smarter.
            </h1>

            <p className="text-blue-100 mt-6 leading-8 text-base">
              Stay organized, manage your daily activities and achieve
              your goals with TaskFlow.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Organize your daily tasks",
                "Track your productivity",
                "Achieve your goals faster",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <FaCheckCircle className="text-blue-200 text-xl" />
                  <span className="text-blue-50">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-blue-200 text-sm">
            © {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>

        </div>

        {/* Right Side - Login Form */}
        <div className="p-7 sm:p-10 md:p-12 lg:p-16">

          {/* Mobile Logo */}
          <Link to="/" className="md:hidden flex items-center gap-2 mb-10">
            <div className="bg-blue-600 text-white p-2.5 rounded-xl">
              <FaTasks size={20} />
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Task<span className="text-blue-600">Flow.</span>
            </h2>
          </Link>

          <div className="mb-9">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Welcome Back
            </span>

            <h2 className="text-3xl font-bold text-gray-900 mt-3">
              Login to Your Account
            </h2>

            <p className="text-gray-500 mt-3 text-sm leading-6">
              Enter your details below to access your account.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm mb-5">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-sm mb-5">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold text-sm mb-2">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold text-sm mb-2">
                Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-7">

              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Forgot Password?
              </Link>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-lg shadow-blue-100"
            >
              {loading ? "Logging in..." : "Login to Account"}
              {!loading && <FaArrowRight />}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Login UI */}
          <button
            type="button"
            onClick={() => setError("Google login is not connected yet.")}
            className="w-full border border-gray-200 hover:bg-gray-50 py-3 rounded-xl flex items-center justify-center gap-3 text-gray-700 font-semibold transition"
          >
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>

          {/* Registration Link */}
          <p className="text-center text-gray-500 text-sm mt-8">
            Don't have an account?{" "}
            <Link
              to="/registration"
              className="text-blue-600 font-bold hover:underline"
            >
              Create Account
            </Link>
          </p>

          <div className="text-center mt-6">
            <Link to="/" className="text-sm text-gray-500 hover:text-blue-600">
              ← Back to Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
