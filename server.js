const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
var cors = require('cors');
//connect db
connectDB();

//init middleware
app.use(cors())
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API RUNNING"));

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/transactions", require("./routes/api/transactions"))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started at ${PORT}`));
