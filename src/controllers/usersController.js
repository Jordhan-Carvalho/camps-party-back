const express = require("express");

const { validateSignup, validateSignin } = require("../middlewares/validation");
const usersRepository = require("../repositories/usersRepository");

const router = express.Router();

router.post("/sign-up", validateSignup, async (req, res) => {
  const userParams = req.body;

  try {
    const createdUser = await usersRepository.create(userParams);
    res.status(201).send(createdUser);
  } catch (e) {
    res.status(409).send(e.message);
  }
});

router.post("/sign-in", validateSignin, async (req, res) => {
  res.send("Rota do api/user/sign-in");
});

module.exports = router;
