const db = require("../database/index");
const bcrypt = require("bcrypt");

async function create(userParams) {
  const { cpf, email, password } = userParams;
  let userId;

  const hashedPass = bcrypt.hashSync(password, 10);

  const result = await db.query(
    "INSERT INTO users (email, cpf, password) VALUES ($1, $2, $3) RETURNING *",
    [email, cpf, hashedPass]
  );
  userId = result.rows[0].id;

  const newUser = {
    id: userId,
    cpf,
    email,
  };

  return newUser;
}

module.exports = {
  create,
};
