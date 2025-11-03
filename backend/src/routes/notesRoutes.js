import express from 'express';
import { getAllNotes, createNote, updateNote, deleteNote, getNoteById } from '../controllers/notesController.js';
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', protect, createNote);
router.put('/:id', protect, updateNote);
router.delete('/:id', protect, deleteNote);

export default router;
