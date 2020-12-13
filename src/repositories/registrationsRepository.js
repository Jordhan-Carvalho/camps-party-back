const db = require("../database/index");

async function create(userId, registrationParams) {
  const { name, address, phone, gender } = registrationParams;

  await db.query(
    'INSERT INTO registrations (name, address, "userId", phone, gender) VALUES ($1,$2, $3, $4, $5)',
    [name, address, userId, phone, gender]
  );

  const newRegistration = {
    userId,
    name,
    address,
    phone,
    gender,
  };

  return newRegistration;
}

async function updatePersonalInfo(userId, registrationParams) {
  const {address, phone} = registrationParams;

  const resp = await db.query('UPDATE registrations SET (address, phone)=($1, $2) WHERE "userId"=$3 RETURNING *', [
    address,
    phone,
    userId,    
  ]);
  return resp.rows[0];
}

async function updateHotel(userId, hotel) {
  const resp = await db.query('UPDATE hotels SET hotel=$1 WHERE "userId"=$2 RETURNING *', [
    hotel,
    userId,    
  ]);
  return resp.rows[0];
}

async function setHotel(userId, hotel) {
  await db.query('INSERT INTO hotels ("userId", hotel) VALUES ($1, $2)', [
    userId,
    hotel,
  ]);
}

async function getHotel(userId) {
  const resp = await db.query(`SELECT * FROM hotels WHERE "userId" = $1`, [
    userId,
  ]);
  return resp.rows[0];
}

async function getUserRegistration(userId) {
  const resp = await db.query(
    `SELECT * FROM registrations WHERE "userId" = $1`,
    [userId]
  );
  return resp.rows[0];
}

module.exports = { create, setHotel, getUserRegistration, getHotel, updateHotel, updatePersonalInfo };
