const express = require("express");

const router = express.Router();

router.post("/sign-up", async (req, res) => {
  res.send("Rota do api/user/sign-up");
});

router.post("/sign-in", async (req, res) => {
  res.send("Rota do api/user/sign-in");
});

module.exports = router;
