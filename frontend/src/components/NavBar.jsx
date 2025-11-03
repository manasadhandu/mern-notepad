import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { PlusIcon, LogOutIcon, LogInIcon, UserPlusIcon } from "lucide-react";
import { isLoggedIn, logout } from "../lib/auth";
import toast from "react-hot-toast";

const NavBar = () => {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/70 border-b border-gray-800 shadow-lg">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Title */}
          <h1
            onClick={() => navigate("/")}
            className="text-3xl font-extrabold text-cyan-400 tracking-tight font-mono hover:text-cyan-300 transition-colors cursor-pointer"
          >
            NotePad
          </h1>

          {/* Right-side buttons */}
          <div className="flex items-center gap-4">
            {loggedIn ? (
              <>
                {/* Create Note Button */}
                <Link
                  to="/create"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-white transition-all duration-200 shadow-md"
                >
                  <PlusIcon className="w-5 h-5" />
                  <span className="font-medium">New Note</span>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all duration-200 shadow-md"
                >
                  <LogOutIcon className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-white transition-all duration-200 shadow-md"
                >
                  <LogInIcon className="w-5 h-5" />
                  <span className="font-medium">Login</span>
                </Link>

                {/* Register Button */}
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500 hover:text-white transition-all duration-200 shadow-md"
                >
                  <UserPlusIcon className="w-5 h-5" />
                  <span className="font-medium">Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
