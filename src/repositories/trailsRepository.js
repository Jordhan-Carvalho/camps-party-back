const db = require("../database");

async function create(userId, trails) {
  const stringTrails = JSON.stringify(trails);  
  let createdTrails;
  let updatedTrails;

  let userExists = await getUserTrails(userId);  

  if(userExists !== undefined){

    try{
      const res = await db.query(
        'UPDATE trails SET trails=$1 WHERE "userId"=$2 RETURNING *',
        [stringTrails, userId]
      )
      updatedTrails = res.rows[0];
    }catch(err){
      console.log(err)
    }
    return updatedTrails;
  }

  console.log("passou")

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
