const db = require("../database/index");

async function create(userId, registrationParams){
    const { name, address, phone, gender} = registrationParams;

    await db.query('INSERT INTO registrations (name, address, "userId", phone, gender) VALUES ($1,$2, $3, $4, $5)', [name, address, userId, phone, gender]);

    const newRegistration ={
        userId,
        name, 
        address,
        phone,
        gender,
    }

    return newRegistration;
}

async function setHotel(userId, hotel) {
    await db.query('INSERT INTO hotels ("userId", hotel) VALUES ($1, $2)', [userId, hotel]);

}

module.exports = { create,setHotel }