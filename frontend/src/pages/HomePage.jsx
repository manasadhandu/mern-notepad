import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import NavBar from "../components/NavBar";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import api from "../lib/axios";
import { Loader2Icon } from "lucide-react";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
      } catch (error) {
        toast.error("Error fetching notes");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-gray-100">
      <NavBar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20 text-cyan-400 gap-2 text-lg font-medium">
            <Loader2Icon className="animate-spin w-6 h-6" />
            Loading Notes...
          </div>
        )}

        {/* No Notes */}
        {!loading && notes.length === 0 && <NotesNotFound />}

        {/* Notes Grid */}
        {!loading && notes.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-white text-center md:text-left">
              Your Notes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
