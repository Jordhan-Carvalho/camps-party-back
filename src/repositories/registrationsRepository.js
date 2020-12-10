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

async function setHotel(userId, hotel) {
  await db.query('INSERT INTO hotels ("userId", hotel) VALUES ($1, $2)', [
    userId,
    hotel,
  ]);
}

async function getUserRegistration(userId) {
  const resp = await db.query(
    `SELECT * FROM registrations WHERE "userId" = $1`,
    [userId]
  );
  return resp.rows[0];
}

module.exports = { create, setHotel, getUserRegistration };
