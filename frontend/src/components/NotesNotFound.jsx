import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center bg-transparent">
      <div className="p-8 rounded-full bg-cyan-500/10 border border-cyan-400/20 shadow-lg shadow-cyan-500/20 backdrop-blur-md">
        <NotebookIcon className="size-12 text-cyan-400 animate-pulse" />
      </div>

      <h3 className="text-3xl font-bold text-cyan-300 mt-6">
        No Notes Yet
      </h3>

      <p className="text-gray-400 max-w-md mt-3 leading-relaxed">
        Ready to organize your thoughts? Create your first note and start capturing your ideas effortlessly.
      </p>

      <Link
        to="/create"
        className="mt-8 btn bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30 hover:text-white transition-all duration-300 shadow-md shadow-cyan-500/20"
      >
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;
