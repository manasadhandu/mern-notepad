import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import NavBar from '../components/NavBar'
import NoteCard from '../components/NoteCard'
import api from '../lib/axios'
import NotesNotFound from '../components/NotesNotFound'



const HomePage = () => {
  const [notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(true);


useEffect ( () => {
  const fetchNotes = async ()=>{ 
  try{
    const res = await api.get("/notes");
    console.log(res.data);
    setNotes(res.data);

    // const res = await fetch("http://localhost:5000/api/notes");
    // const data = await res.json();
    // console.log(data);    //this is like fetch method
  }catch(error) {
    toast.error("Error fetching notes")
  }
  finally{
    setLoading(false);
  }
};
  fetchNotes();
},[])



  return (
    <div className='min-h-screen'>
        <NavBar />
        <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>loading Notes...</div> }
        {notes.length === 0 && <NotesNotFound />}
        {notes.length>0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) =>(
              <NoteCard key={note._id} note={note} setNotes={setNotes}></NoteCard>
        ))}
          </div>
        )}

        </div>
        
    </div>
  )}

export default HomePage
