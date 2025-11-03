import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Loader2Icon, UserPlusIcon, ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { saveToken } from "../lib/auth";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", { name, email, password });
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Register error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center text-gray-100">
      <div className="w-full max-w-md bg-gray-900/70 border border-gray-800 rounded-2xl shadow-2xl p-8 backdrop-blur-md">

        <div className="flex items-center gap-2 mb-6">
          <UserPlusIcon className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-400 text-sm">Name</label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-800 border-gray-700 text-gray-100 mt-1 focus:border-cyan-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <input
              type="email"
              className="input input-bordered w-full bg-gray-800 border-gray-700 text-gray-100 mt-1 focus:border-cyan-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Password</label>
            <input
              type="password"
              className="input input-bordered w-full bg-gray-800 border-gray-700 text-gray-100 mt-1 focus:border-cyan-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-cyan-600 hover:bg-cyan-500 border-none text-white font-semibold rounded-lg transition-all mt-2"
          >
            {loading ? (
              <>
                <Loader2Icon className="animate-spin w-5 h-5" /> Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
