const express = require("express");
const authMiddleware = require("../middlewares/auth");

const registrationsRepository = require('../repositories/registrationsRepository')
const { validateRegistration } = require("../middlewares/validation");

const router = express.Router();

router.get("/ticket", authMiddleware, async (req, res) => {
    const user = res.locals.user;
    res.status(200).send(user.ticket);
});

router.post("/create", validateRegistration, authMiddleware, async (req, res) => {
    const userId = res.locals.user.id;

    try{
        let createdRegistration = await registrationsRepository.create(userId, req.body);
        if(req.body.hasOwnProperty('hotel') && req.body.hotel){
            await registrationsRepository.setHotel(userId, req.body.hotel);
        }
        res.status(201).send(createdRegistration);
    }catch(err){
        console.log(err);
    }
})

module.exports = router;