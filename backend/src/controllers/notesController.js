import Note from "../models/Note.js";

export async function getAllNotes (req,res){
    try {
        const notes = await Note.find(); // if we want newest first we need [.sort({createdAT :-1})]
        res.status(200).json(notes)
        
    } catch (error) {
        console.error("Error in getAllUsers",error)
        res.status(500).json({message:"Error in internal server.."})
        
    }
}


 export async function getNoteById (req,res){
    try{
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message:"note not found"})
        res.status(200).json(note)
    }catch(error){
        console.error("Error in getting",error)
        res.status(500).json({message :"Error in internal Server"})
    }
}


export async function createNote (req,res){
   try {
     const {title,content} = req.body
     const newNote = new Note({title,content});
    //  const savedNote = await newNote.save();
    //  res.status(200).json(savedNote)
     await newNote.save();
     res.status(201).json({message: "note created successfully"});

   } catch (error) {
    console.error("Error in Creating Note",error)
    res.status(500).json({message:"Error in internal server.."})
   }
}



export async function updateNote (req,res){
    try {
        const {title,content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{ new:true,})
        if(!updatedNote) return res.status(404).json({message: "note not found"})
        res.status(200).json({message : "note updated successfully"});
        
    } catch (error) {
        console.error("Error in Updating Note",error);
        res.status(500).json({message : "Error in internal server.."})       
    }
    
}



// export async function deleteNote (req,res){
//     try {
//         const deletedNote = await Note.findByIdAndDelete(req.params.id)
//         if (!deletedNote) return res.status(404).json({message :"note not found"})
//         res.status(200).json({message: "Note Deleted successfully"})
//     } catch (error) {
//         console.error("Error in Deleting Note",error);
//         res.status(500).json({message : "Error in internal server.."})
//     }


// }




export async function deleteNote (req, res) {
  try {
    console.log("Delete request received for ID:", req.params.id);

    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      console.log(" No note found with ID:", req.params.id);
      return res.status(404).json({ message: "Note not found" });
    }

    console.log("Deleted Note:", deletedNote);
    res.status(200).json({ message: "Note Deleted successfully" });
  } catch (error) {
    console.error("Error in Deleting Note:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
