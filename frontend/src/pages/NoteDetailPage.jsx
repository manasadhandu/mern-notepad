import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { Loader2Icon, Trash2Icon, ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note");
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete the note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error in deleting note", error);
      toast.error("Failed to delete note!");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error in updating note", error);
      toast.error("Failed to update note!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-gray-100">
        <Loader2Icon className="animate-spin w-10 h-10 text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-gray-100">
      <div className="container mx-auto px-6 py-10">
        <div className="max-w-2xl mx-auto bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Notes</span>
            </Link>

            <button
              onClick={handleDelete}
              className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors"
            >
              <Trash2Icon className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Note title"
                className="w-full rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>

            {/* Content Input */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Content
              </label>
              <textarea
                placeholder="Update your note content..."
                className="w-full h-40 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                value={note.content}
                onChange={(e) =>
                  setNote({ ...note, content: e.target.value })
                }
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end">
              <button
                className="px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-all disabled:opacity-50"
                disabled={saving}
                onClick={handleSave}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
