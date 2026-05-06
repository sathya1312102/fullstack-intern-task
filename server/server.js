const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const templateRoutes = require("./routes/templateRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000","https://fullstack-intern-task-vo5n.vercel.app"],
  credentials: true,
}));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/favorites", favoriteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
