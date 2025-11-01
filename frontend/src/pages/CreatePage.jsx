import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon, Loader2Icon, StickyNoteIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required!");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error in creating note:", error);
      toast.error("Failed to create note!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-gray-100">
      <div className="container mx-auto px-4 py-10 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <Link
            to="/"
            className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition mb-6"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Notes
          </Link>

          <div className="card bg-gray-900/50 backdrop-blur-md shadow-2xl border border-gray-700 rounded-2xl">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-6">
                <StickyNoteIcon className="w-7 h-7 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">
                  Create a New Note
                </h2>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text text-gray-300 text-sm">
                      Title
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your note title..."
                    className="input input-bordered bg-gray-800 text-gray-100 border-gray-700 focus:border-cyan-500 focus:ring-cyan-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Content */}
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text text-gray-300 text-sm">
                      Content
                    </span>
                  </label>
                  <textarea
                    placeholder="Write your note details here..."
                    className="textarea textarea-bordered bg-gray-800 text-gray-100 border-gray-700 h-40 focus:border-cyan-500 focus:ring-cyan-500"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary bg-cyan-600 hover:bg-cyan-500 border-none px-6 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2Icon className="animate-spin w-5 h-5" />
                        Creating...
                      </>
                    ) : (
                      "Create Note"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
