const supertest = require("supertest");

const app = require("../app");
const usersRepository = require("../repositories/usersRepository");

async function generateTestUser(ticketType) {
  const testUser = {
    cpf: "25698563256",
    email: "test@test.com",
    password: "test123",
    confirmPassword: "test1233",
    ticket: ticketType,
  };
  await usersRepository.create(testUser);
  const res = await supertest(app)
    .post("/api/users/sign-in")
    .send({ email: testUser.email, password: testUser.password });
  return res.body;
}

module.exports = { generateTestUser };
