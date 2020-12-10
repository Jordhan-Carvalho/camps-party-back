require("dotenv").config();
const express = require("express");
const cors = require("cors");

const usersController = require("./controllers/usersController");

const trailsController = require("./controllers/trailsController");

const registrationsController = require("./controllers/registrationsController");

const app = express();

app.use(cors());
app.use(express.json());
// Define Routes
app.use("/api/users", usersController);
app.use("/api/trails", trailsController);
app.use("/api/registration", registrationsController);

const port = process.env.PORT;

app.listen(port, () => console.log(`Servidor on no port ${port}`));

module.exports = app;
