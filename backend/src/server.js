import express from 'express';
import cors from 'cors'
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000
connectDB();

app.use(cors({
    origin : "http://localhost:5173"
})
)

app.use(express.json());
app.use('/api/notes',notesRoutes);

//server port

app.listen(PORT,() => {
    console.log("server running...",PORT)
})