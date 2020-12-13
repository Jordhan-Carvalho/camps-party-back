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

router.post("/personal-info", authMiddleware, async (req, res) => {
    const userId = res.locals.user.id;

    try{
        let newPersonalInfo = await registrationsRepository.updatePersonalInfo(userId, req.body);
        res.status(201).send(newPersonalInfo)
    }catch(err){
        console.log(err)
    }
})

router.get("/hotel", authMiddleware, async (req,res) => {
    const userId = res.locals.user.id;
    
    try{
        let hotelRegistrated = await registrationsRepository.getHotel(userId);        
        res.status(200).send(hotelRegistrated)
    }catch(err){
        console.log(err)
    }
})

router.post("/hotel", authMiddleware, async (req, res) => {
    const userId = res.locals.user.id;
    const { hotel } = req.body;

    try{
        let newHotel = await registrationsRepository.updateHotel(userId,hotel);
        res.status(201).send(newHotel) 
    }catch(err){
        console.log(err)
    }
});

module.exports = router;