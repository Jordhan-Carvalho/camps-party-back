const db = require("../database/index");
const bcrypt = require("bcrypt");

async function create(userParams) {
  // const { username, biography, avatarUrl, email, password } = userParams;
  // let userId;

  // const hashedPass = bcrypt.hashSync(password, 10);
  // try {
  //   const result = await db.query(
  //     'INSERT INTO users (username, biography, "avatarUrl", email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
  //     [username, biography, avatarUrl, email, hashedPass]
  //   );
  //   userId = result.rows[0].id;
  // } catch (e) {
  //   console.log(e);
  // }

  // const newUser = {
  //   id: userId,
  //   username,
  //   biography,
  //   avatarUrl,
  //   email,
  // };

  return newUser;
}

module.exports = {
  create,
};
