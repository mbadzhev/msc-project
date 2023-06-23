require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.SERVER_PORT;

// Initial connection to database and handle errors
try {
  mongoose.connect(process.env.DATABASE_URI);
} catch (error) {
  console.error(`Error connecting to database.\n`, error);
}
mongoose.connection.once("open", () => console.log("Connected to database.\n"));
// Handle errors after initial connection is established
mongoose.connection.on("error", (error) => {
  console.error(`Error connecting to database.\n`, error);
});

app.use(cors());

app.use(express.json());

// Routes
app.use("/api/users", require("./routes/users"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
