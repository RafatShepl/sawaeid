require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require("./DB/connectDb.js");
const cookieParser = require("cookie-parser");

const app = express();

/* ========= Middlewares ========= */
app.use(cors({
  origin: "http://localhost:5173", // 
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());



/* ========= MongoDB ========= */
connectDB();

/* ========= Routes ========= */
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/expense-types', require('./routes/expenseTypeRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));

/* ========= Server ========= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
