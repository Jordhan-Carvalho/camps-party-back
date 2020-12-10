const express = require("express");
const authMiddleware = require("../middlewares/auth");

const { validateRegistration } = require("../middlewares/validation");

const router = express.Router();

router.get("/ticket", authMiddleware, async (req, res) => {
    const user = res.locals.user;
    res.status(200).send(user.type);
});


module.exports = router;