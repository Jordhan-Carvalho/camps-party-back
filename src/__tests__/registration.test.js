const supertest = require("supertest");

const app = require("../app");
const db = require("../database/index");

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsImlhdCI6MTYwNzYzMDgzNCwiZXhwIjoxNjA4MDYyODM0fQ.DoqSoODn6Z9NKsDGHqwXUhSvCA7S2NVvHXfxKbjErjQ";

async function cleanDB() {
    try {
      await db.query("DELETE FROM registrations");
      await db.query("DELETE FROM hotels");
    } catch (error) {
      console.log(error);
    }
}

beforeAll(async () => await cleanDB());
afterAll(async () => {
  await cleanDB();
  db.end();
});

describe("GET /ticket", () =>{
    it('should return status 200 and "hotel" when passed valid token', async () => {

        const res = await supertest(app).get("/api/registration/ticket").set("x-access-token", token);

        expect(res.status).toBe(200);
        expect(res.body).toBe('hotel');
    })
})