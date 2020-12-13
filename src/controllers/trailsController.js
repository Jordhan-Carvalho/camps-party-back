const express = require("express");
const trailsRepository = require("../repositories/trailsRepository");
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post("/post-trails", authMiddleware, async (req, res) => {
  const userId = res.locals.user.id;
  const trails = req.body;

  try {
    const createdTrail = await trailsRepository.create(userId, trails);
    res.status(201).send(createdTrail);
  } catch (e) {
    res.status(409).send(e.message);
  }
  });

router.get("/get-trails", authMiddleware, async(req, res) => {
  const userId = res.locals.user.id;

  try{
    const chosenTrails = await trailsRepository.getUserTrails(userId);
    res.status(200).send(chosenTrails);
  }catch(err){
    console.log(err)
  }
})

  module.exports = router;