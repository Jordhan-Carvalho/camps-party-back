const supertest = require("supertest");

const app = require("../app");
const db = require("../database/index");

let userId;

async function cleanDB() {
  try {
    await db.query("DELETE FROM users");
  } catch (error) {
    console.log(error);
  }
}

beforeAll(async () => await cleanDB());
afterAll(async () => {
  await cleanDB();
  db.end();
});

describe("POST /sign-up", () => {
  it("should respond with status 422 when body password different from passwordConfirmation ", async () => {
    const body = {
      email: "test2@test.com",
      cpf: "01256358625",
      password: "test123",
      confirmPassword: "test1233",
    };

    const res = await supertest(app).post("/api/users/sign-up").send(body);

    expect(res.status).toBe(422);
  });

  it("should respond with status 201 when successfully create user", async () => {
    const body = {
      email: "test@test.com",
      cpf: "01256358625",
      password: "test123",
      confirmPassword: "test123",
    };

    const res = await supertest(app).post("/api/users/sign-up").send(body);

    userId = res.body.id;

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("cpf");
    expect(res.body).toHaveProperty("id");
  });

  it("should respond with status 409 when email already registered", async () => {
    const body = {
      email: "test@test.com",
      cpf: "01256358625",
      password: "test123",
      confirmPassword: "test123",
    };

    const res = await supertest(app).post("/api/users/sign-up").send(body);

    expect(res.status).toBe(409);
  });
});
