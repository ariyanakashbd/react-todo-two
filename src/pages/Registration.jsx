import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTasks,FaUser,FaEnvelope,FaLock,FaEye,FaEyeSlash,FaArrowRight,FaCheckCircle,FaGoogle,} 
from "react-icons/fa";
import axios from "axios";

// backend API (D:\todo full backend — port 5000 এ চলছে)
const API_URL = "http://localhost:5000";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  terms: false,
};

const Registration = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [form, setForm] = useState(emptyForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setFieldErrors({});

    if (form.password !== form.confirmPassword) {
      setFieldErrors({ confirmPassword: "Password and Confirm Password don't match" });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/registration`, form);
      const data = res.data;

      if (!data.success) {
        if (typeof data.message === "object") {
          // backend field-wise error (errors.email, errors.name ...)
          setFieldErrors(data.message);
        } else if (data.message.toLowerCase().includes("email")) {
          // email related string message backend theke
          setFieldErrors({ email: data.message });
        } else {
          setError(data.message);
        }
        return;
      }

      setSuccess(data.message);
      setForm(emptyForm);
      navigate("/login");
    } catch {
      setError("Backend-এ connect করা যাচ্ছে না। server চালু আছে কি?");
    } finally {
      setLoading(false);
    }
  };
 

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-5 py-12">
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
              Start Your Journey
              <br />
              With TaskFlow.
            </h1>

            <p className="text-blue-100 mt-6 leading-8">
              Create your account and take control of your daily tasks.
              Stay focused, organized and productive every day.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Manage your daily activities",
                "Track your completed tasks",
                "Improve your productivity",
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

        {/* Right Side */}
        <div className="p-7 sm:p-10 md:p-12 lg:p-14">
          {/* Mobile Logo */}
          <Link to="/" className="md:hidden flex items-center gap-2 mb-8">
            <div className="bg-blue-600 text-white p-2.5 rounded-xl">
              <FaTasks size={20} />
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Task<span className="text-blue-600">Flow.</span>
            </h2>
          </Link>

          {/* Heading */}
          <div className="mb-7">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Create Account
            </span>

            <h2 className="text-3xl font-bold text-gray-900 mt-3">
              Join TaskFlow Today
            </h2>

            <p className="text-gray-500 mt-3 text-sm leading-6">
              Fill in your details to create your free account.
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
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold text-sm mb-2">
                Full Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              {fieldErrors.name && (
                <p className="text-red-500 text-xs mt-1.5">{fieldErrors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold text-sm mb-2">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              {fieldErrors.email && (
                <p className="text-red-500 text-xs mt-1.5">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold text-sm mb-2">
                Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
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

              {fieldErrors.password && (
                <p className="text-red-500 text-xs mt-1.5">{fieldErrors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold text-sm mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {fieldErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1.5">
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Gender */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold text-sm mb-2">
                Gender
              </label>

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>

              {fieldErrors.gender && (
                <p className="text-red-500 text-xs mt-1.5">{fieldErrors.gender}</p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 text-sm text-gray-600 mb-6 cursor-pointer">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
                className="w-4 h-4 mt-0.5 accent-blue-600"
              />

              <span>
                I agree to the{" "}
                <Link to="/terms" className="text-blue-600 font-semibold hover:underline">
                  Terms & Conditions
                </Link>{" "}
                and Privacy Policy.
              </span>
            </label>

            {fieldErrors.terms && (
              <p className="text-red-500 text-xs -mt-4 mb-4">{fieldErrors.terms}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-lg shadow-blue-100"
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <FaArrowRight />}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>


          {/* Login Link */}
          <p className="text-center text-gray-500 text-sm mt-7">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-bold hover:underline"
            >
              Login Now
            </Link>
          </p>

          <div className="text-center mt-5">
            <Link to="/" className="text-sm text-gray-500 hover:text-blue-600">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;