require("dotenv").config();
const express = require("express");
const cors = require("cors");

const usersController = require("./controllers/usersController");

const app = express();

app.use(cors());
app.use(express.json());
// Define Routes
app.use("/api/users", usersController);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;
