// const sessionsRepository = require("../repositories/sessionsRepository");

// async function authMiddleware(req, res, next) {
//   const authHeader = req.header("Authorization");
//   if (!authHeader)
//     return res.status(401).send({ error: "Auth header not found" });

//   const token = authHeader.replace("Bearer ", "");

//   const session = await sessionsService.findByToken(token);
//   if (!session) return res.status(401).send({ error: "Invalid token" });
//   const user = await usersService.findById(session.userId);
//   if (!user) return res.status(401).json({ error: "Invalid token" });
//   res.locals.user = user;
//   res.locals.session = session;

//   next();
// }

// module.exports = authMiddleware;
