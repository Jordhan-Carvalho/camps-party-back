const express = require("express");
const trailsRepository = require("../repositories/trailsRepository");
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post("/post-trails", authMiddleware, async (req, res) => {

    const trails = req.body;
    
    try {
      const createdTrail = await trailsRepository.create(res.locals.user.id, trails);
      res.status(201).send(createdTrail);
    } catch (e) {
      res.status(409).send(e.message);
    }
  });

  module.exports = router;