const db = require("../database");

async function create(userId, trails) {

 const stringTrails = JSON.stringify(trails);

 let createdTrails;
 let trails; 

  try {
    const result = await db.query(
      `INSERT INTO trails ("userId", trails) VALUES ($1, $2) RETURNING *`,
      [userId, stringTrails ]);

    createdTrails = result.rows;
    trails = JSON.parse(createdTrails);

  } catch(error) {
      console.log(error)
  }

  console.log(trails);
  return trails;
  
}

module.exports = {
    create
  
  };
  