import { PenSquareIcon, TrashIcon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';
import { formatDate } from '../lib/utils';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm('Are you sure you want to delete the note?')) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success('Note deleted successfully!');
    } catch (error) {
      console.log('Error in deleting note!', error);
      toast.error('Failed to delete note');
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-gray-900/70 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 rounded-2xl overflow-hidden"
    >
      <div className="card-body p-5">
        <h2 className="card-title text-cyan-300 font-semibold text-xl mb-2">
          {note.title}
        </h2>
        <p className="text-gray-300/80 line-clamp-3 leading-relaxed">
          {note.content}
        </p>

        <div className="card-actions justify-between items-center mt-6">
          <span className="text-sm text-gray-400 italic">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-3">
            <PenSquareIcon className="w-4 h-4 text-cyan-400 hover:text-cyan-300 transition-colors" />
            <button
              className="btn btn-ghost btn-xs text-red-400 hover:text-red-300 transition-colors"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
