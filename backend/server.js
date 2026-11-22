// Backend entry point — এই file থেকেই server চালু হয়
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Database connect
connectDB();

// 2. Middleware (JSON body পড়া আর CORS allow করা)
app.use(cors());
app.use(express.json());

// 3. Routes
app.get("/", (req, res) => {
  res.send("Todo API is running 🚀");
});

app.use("/api/todos", todoRoutes);

// 4. Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
