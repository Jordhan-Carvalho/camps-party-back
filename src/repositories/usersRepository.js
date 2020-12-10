const db = require("../database/index");
const bcrypt = require("bcrypt");

async function create(userParams) {
  const { cpf, email, password, type } = userParams;
  let userId;

  const hashedPass = bcrypt.hashSync(password, 10);

  const result = await db.query(
    "INSERT INTO users (email, cpf, password, type) VALUES ($1, $2, $3, $4) RETURNING *",
    [email, cpf, hashedPass, type]
  );
  userId = result.rows[0].id;

  const newUser = {
    id: userId,
    cpf,
    email,
    type,
  };

  return newUser;
}

async function findByEmail(user) {
  const { email, password } = user;

  const resp = await db.query("SELECT * FROM users WHERE email = $1", [email]);

  if (resp.rowCount === 0) return undefined;
  const foundUser = resp.rows[0];
  const isPassCorrect = bcrypt.compareSync(password, foundUser.password);

  if (!isPassCorrect) return undefined;
  return foundUser;
}

async function findById(userId) {
  const resp = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
  return resp.rows[0];
}

module.exports = {
  create,
  findByEmail,
  findById,
};
