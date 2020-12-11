const supertest = require("supertest");

const app = require("../app");
const db = require("../database/index");

let user;

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
      ticket: "teste",
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
      ticket: "teste",
      password: "test123",
      confirmPassword: "test123",
    };

    const res = await supertest(app).post("/api/users/sign-up").send(body);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("cpf");
    expect(res.body).toHaveProperty("id");
  });

  it("should respond with status 409 when email already registered", async () => {
    const body = {
      email: "test@test.com",
      cpf: "01256358625",
      ticket: "teste",
      password: "test123",
      confirmPassword: "test123",
    };

    const res = await supertest(app).post("/api/users/sign-up").send(body);

    expect(res.status).toBe(409);
  });
});

describe("POST /sign-in", () => {
  it("should respond with status 200 when info is correct ", async () => {
    const body = {
      email: "test@test.com",
      password: "test123",
    };

    const res = await supertest(app).post("/api/users/sign-in").send(body);

    user = res.body;

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("cpf");
    expect(res.body).toHaveProperty("ticket");
    expect(res.body).toHaveProperty("token");
  });

  it("should respond with status 401 when password is incorrect", async () => {
    const body = {
      email: "test@test.com",
      password: "wrongpass",
    };

    const res = await supertest(app).post("/api/users/sign-in").send(body);

    expect(res.status).toBe(401);
  });
});

describe("GET /:id/complete-reg", () => {
  it("should respond with status 200 when authenticated user has no registration", async () => {
    const res = await supertest(app)
      .get(`/api/users/${user.id}/complete-reg`)
      .set({ "x-access-token": user.token });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({});
  });
});
