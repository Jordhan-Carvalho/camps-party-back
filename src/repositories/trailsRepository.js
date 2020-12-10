const db = require("../database");

async function create(userId, trails) {
  const stringTrails = JSON.stringify(trails);

  let createdTrails;
  let trailsFinal;

  try {
    const result = await db.query(
      `INSERT INTO trails ("userId", trails) VALUES ($1, $2) RETURNING *`,
      [userId, stringTrails]
    );

    createdTrails = result.rows;
    trailsFinal = JSON.parse(createdTrails);
  } catch (error) {
    console.log(error);
  }

  return trailsFinal;
}

module.exports = {
  create,
};
