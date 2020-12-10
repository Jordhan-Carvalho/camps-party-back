const express = require("express");
const jwt = require("jsonwebtoken");

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
  const userParams = req.body;

  try {
    const user = await usersRepository.findByEmail(userParams);

    if (!user) return res.sendStatus(401);
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "2 days",
    });

    res.status(200).send({ ...user, token });
  } catch (e) {
    console.log("Catch", e);
  }
});

router.get("/countdown", (req,res) => {
  const event = new Date('December 11, 2020 18:00:00');
  res.status(200).send({event})
});

module.exports = router;
