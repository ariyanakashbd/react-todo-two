
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaArrowRight,
  FaRocket,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    {
      icon: <FaTasks />,
      title: "Easy Task Management",
      description: "Create, organize and manage all your daily tasks easily.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Track Your Progress",
      description: "Keep track of completed and pending tasks.",
    },
    {
      icon: <FaClock />,
      title: "Save Your Time",
      description: "Manage your time and stay focused on important tasks.",
    },
    {
      icon: <FaChartLine />,
      title: "Boost Productivity",
      description: "Improve your productivity with a simple workflow.",
    },
  ];

  const navLinkClass = ({ isActive }) =>
    `font-medium transition ${
      isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
    }`;

  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2"
          >
            <div className="bg-blue-600 text-white p-2.5 rounded-xl">
              <FaTasks size={21} />
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Task<span className="text-blue-600">Flow.</span>
            </h2>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-9">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <a
              href="/#features"
              className="font-medium text-gray-600 hover:text-blue-600 transition"
            >
              Features
            </a>

            <NavLink to="/todo" className={navLinkClass}>
              Todos
            </NavLink>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="font-semibold text-gray-700 hover:text-blue-600 transition"
            >
              Login
            </Link>

            <Link
              to="/registration"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition shadow-md shadow-blue-100"
            >
              Get Started <FaArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-800 text-xl p-2"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-5 py-5 shadow-lg">
            <div className="flex flex-col gap-5">

              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass}
              >
                Home
              </NavLink>

              <a
                href="/#features"
                onClick={() => setMenuOpen(false)}
                className="font-medium text-gray-600 hover:text-blue-600"
              >
                Features
              </a>

              <NavLink
                to="/todo"
                onClick={() => setMenuOpen(false)}
                className={navLinkClass}
              >
                Todos
              </NavLink>

              <hr className="border-gray-100" />

              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="font-semibold text-gray-700"
              >
                Login
              </Link>

              <Link
                to="/registration"
                onClick={() => setMenuOpen(false)}
                className="bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>

        {/* Hero Section */}
        <section className="bg-blue-50">
          <div className="max-w-7xl mx-auto px-5 py-24 md:py-32 grid md:grid-cols-2 gap-14 items-center">

            <div>
              <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <FaRocket className="inline mr-2" />
                Organize Your Life
              </span>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Manage Your Tasks
                <span className="text-blue-600"> Smarter & Faster.</span>
              </h1>

              <p className="text-gray-600 text-base md:text-lg leading-8 mt-6 max-w-lg">
                Stay organized, manage your daily tasks and achieve your goals
                with our simple and powerful Todo Application.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/registration"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-lg font-semibold flex items-center gap-2 transition"
                >
                  Get Started <FaArrowRight />
                </Link>

                <Link
                  to="/login"
                  className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-7 py-3.5 rounded-lg font-semibold transition"
                >
                  Login
                </Link>
              </div>

              <div className="flex gap-8 mt-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">100%</h3>
                  <p className="text-sm text-gray-500">Easy to Use</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
                  <p className="text-sm text-gray-500">Available</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Free</h3>
                  <p className="text-sm text-gray-500">To Start</p>
                </div>
              </div>
            </div>

            {/* Todo Preview */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">

              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    My Tasks
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Manage your daily activities
                  </p>
                </div>

                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                  <FaTasks size={22} />
                </div>
              </div>

              <div className="bg-blue-50 p-5 rounded-xl mb-6">
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-gray-700">
                    Daily Progress
                  </span>
                  <span className="font-bold text-blue-600">75%</span>
                </div>

                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-3/4 rounded-full"></div>
                </div>
              </div>

              {[
                ["Complete React Project", true],
                ["Learn JavaScript", true],
                ["Practice Backend API", true],
                ["Build Todo Application", false],
              ].map(([task, completed], index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 border-b border-gray-100"
                >
                  <FaCheckCircle
                    className={
                      completed
                        ? "text-green-500 text-xl"
                        : "text-gray-300 text-xl"
                    }
                  />

                  <span
                    className={`font-medium ${
                      completed
                        ? "text-gray-400 line-through"
                        : "text-gray-700"
                    }`}
                  >
                    {task}
                  </span>
                </div>
              ))}

              <div className="mt-6 text-center text-sm text-gray-500">
                Your productivity starts here!
              </div>
            </div>

          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-5">
          <div className="max-w-7xl mx-auto">

            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
                Our Features
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
                Everything You Need to Stay Organized
              </h2>

              <p className="text-gray-500 mt-4 leading-7">
                Simple tools to help you manage your daily work and reach your goals.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-7 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-6">
                    {feature.icon}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-500 leading-7 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* CTA Section */}
        <section className="px-5 pb-24">
          <div className="max-w-7xl mx-auto bg-blue-600 rounded-3xl px-6 py-16 text-center">

            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Get More Done?
            </h2>

            <p className="text-blue-100 mt-4">
              Start organizing your tasks and make every day productive.
            </p>

            <Link
              to="/registration"
              className="inline-flex items-center gap-2 mt-8 bg-white text-blue-600 px-8 py-3.5 rounded-lg font-bold hover:bg-blue-50 transition"
            >
              Create Free Account <FaArrowRight />
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-5 py-14">

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">

            <div>
              <Link to="/" className="text-2xl font-bold">
                Task<span className="text-blue-500">Flow.</span>
              </Link>

              <p className="text-gray-400 mt-5 leading-7 text-sm max-w-sm">
                Make your daily life easier with TaskFlow. Organize your work,
                manage your tasks and achieve your goals.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-5">Quick Links</h3>

              <div className="flex flex-col gap-3 text-gray-400 text-sm">
                <Link to="/" className="hover:text-blue-400 transition">
                  Home
                </Link>

                <a href="/#features" className="hover:text-blue-400 transition">
                  Features
                </a>

                <Link to="/login" className="hover:text-blue-400 transition">
                  Login
                </Link>

                <Link to="/registration" className="hover:text-blue-400 transition">
                  Registration
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-5">Get Started</h3>

              <p className="text-gray-400 text-sm leading-7 mb-5">
                Join TaskFlow today and start managing your tasks smarter.
              </p>

              <Link
                to="/registration"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold transition"
              >
                Create Account <FaArrowRight size={13} />
              </Link>
            </div>

          </div>

          <div className="border-t border-gray-800 mt-12 pt-7 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} TaskFlow. All rights reserved.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default Home;
