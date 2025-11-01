import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/70 border-b border-gray-800 shadow-lg">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Title */}
          <h1 className="text-3xl font-extrabold text-cyan-400 tracking-tight font-mono hover:text-cyan-300 transition-colors">
            ThinkBoard
          </h1>

          {/* Create Note Button */}
          <div className="flex items-center gap-4">
            <Link
              to="/create"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-white transition-all duration-200 shadow-md"
            >
              <PlusIcon className="w-5 h-5" />
              <span className="font-medium">New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
