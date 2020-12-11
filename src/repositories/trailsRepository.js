const db = require("../database");

async function create(userId, trails) {
  const stringTrails = JSON.stringify(trails);

  let createdTrails;

  try {
    const result = await db.query(
      `INSERT INTO trails ("userId", trails) VALUES ($1, $2) RETURNING *`,
      [userId, stringTrails]
    );
    createdTrails = result.rows[0];
  } catch (error) {
    console.log(error);
  }

  return createdTrails;
}

async function getUserTrails(userId) {
  const resp = await db.query(`SELECT * FROM trails WHERE "userId" = $1`, [
    userId,
  ]);
  return resp.rows[0];
}

module.exports = {
  create,
  getUserTrails,
};
