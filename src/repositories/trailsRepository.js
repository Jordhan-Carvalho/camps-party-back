const db = require("../database");

async function create(userId, trails) {

 const stringTrails = JSON.stringify(trails);

 let createdTrails;

  try {
    const result = await db.query(
      `INSERT INTO trails ("userId", trails) VALUES ($1, $2) RETURNING *`,
      [userId, stringTrails ]);

    createdTrails = result.rows;

  } catch(error) {
      console.log(error)
  }

  console.log(createdTrails);
  return createdTrails;
  
}

module.exports = {
    create
  
  };
  