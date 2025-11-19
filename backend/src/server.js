// import express from "express";
// import cors from "cors";
// import notesRoutes from "./routes/notesRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import { connectDB } from "./config/db.js";
// import dotenv from "dotenv";
// import path from "path";

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

// // DB connect
// connectDB();

// app.use(express.json());
// app.use(cors({ origin: "*" }));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/notes", notesRoutes);

// // Serve frontend in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));
//   app.get("*", (req, res) =>
//     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
//   );
// }

// app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors({
  origin: "https://mern-notepad-t2re.vercel.app",  // ← your current live Vercel URL
  credentials: true,  // if you use cookies
}));
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Remove or comment out everything below this line
// if (process.env.NODE_ENV === "production") { ... }

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
