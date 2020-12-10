const jwt = require("jsonwebtoken");
const usersRepository = require("../repositories/usersRepository");

async function authMiddleware(req, res, next) {
  const token = req.header("x-access-token");
  if (!token) return res.status(401).send({ error: "Auth header not found" });

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    const user = await usersRepository.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.locals.user = { id: user.id, email: user.email, cpf: user.cpf, ticket: user.ticket };

    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "Invalid token" });
  }
}

module.exports = authMiddleware;
