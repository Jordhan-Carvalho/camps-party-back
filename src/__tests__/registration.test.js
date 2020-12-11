const supertest = require("supertest");

const app = require("../app");
const db = require("../database/index");
const { generateTestUser } = require("../utils/testHelperFuncs");

let user;

async function cleanDB() {
    try {
      await db.query("DELETE FROM registrations");
      await db.query("DELETE FROM users");
      await db.query("DELETE FROM hotels");
    } catch (error) {
      console.log(error);
    }
}

beforeAll(async () => {
  await cleanDB();
});

afterAll(async () => {
  await cleanDB();
  db.end();
});

describe("GET /ticket", () =>{
  it('should return status 200 and "hotel" when passed valid token and selected ticket type hotel', async () => {
    user = await generateTestUser('hotel');
    const res = await supertest(app).get("/api/registration/ticket").set("x-access-token", user.token);
    
    expect(res.status).toBe(200);
    expect(res.text).toBe('hotel');
    await cleanDB();
  })

  it('should return status 200 and "noAccommodation" when passed valid token and selected ticket type noAccommodation', async () => {
    user = await generateTestUser('noAccommodation');
    const res = await supertest(app).get("/api/registration/ticket").set("x-access-token", user.token);
    
    expect(res.status).toBe(200);
    expect(res.text).toBe('noAccommodation');
    await cleanDB();
  })

  it('should return status 200 and "camping" when passed valid token and selected ticket type camping', async () => {
    user = await generateTestUser('camping');
    const res = await supertest(app).get("/api/registration/ticket").set("x-access-token", user.token);
    
    expect(res.status).toBe(200);
    expect(res.text).toBe('camping');
    await cleanDB();
  })
})

describe("POST /create", () =>{
  it("should return 201 when passed valid token and params", async () => {
    user = await generateTestUser('camping');
    const body = {
      name: 'Teste Silva',
      address: 'Rua Teste',
      phone: '(99) 9999-9999',
      gender: 'teste',
    }

    const res = await supertest(app).post("/api/registration/create").send(body).set("x-access-token", user.token);

    expect(res.status).toBe(201);
    await cleanDB();
  })

  it("should return 422 when passed valid token and missing some required attribute", async () => {
    user = await generateTestUser('camping');
    const body = {
      name: 'Teste Silva',
      address: 'Rua Teste',
      phone: '(99) 9999-9999',
    }

    const res = await supertest(app).post("/api/registration/create").send(body).set("x-access-token", user.token);

    expect(res.status).toBe(422);
    await cleanDB();
  })

  it("should return 401 when missing token", async () => {
    user = await generateTestUser('camping');
    const body = {
      name: 'Teste Silva',
      address: 'Rua Teste',
      phone: '(99) 9999-9999',
      gender: 'teste',
    }

    const res = await supertest(app).post("/api/registration/create").send(body);

    expect(res.status).toBe(401);
    await cleanDB();
  })

  it("should return 404 when user is not in db", async () => {
    user = await generateTestUser('camping');
    await cleanDB();
    const body = {
      name: 'Teste Silva',
      address: 'Rua Teste',
      phone: '(99) 9999-9999',
      gender: 'teste',
    }

    const res = await supertest(app).post("/api/registration/create").send(body).set("x-access-token", user.token);

    expect(res.status).toBe(404);
    await cleanDB();
  })

})