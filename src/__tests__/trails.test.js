const supertest = require("supertest");

const app = require("../app");
const db = require("../database");

async function cleanDBTrails() {
  try {
    await db.query("DELETE FROM trails");
  } catch (error) {
    console.log(error);
  }
}

beforeAll(async () => await cleanDBTrails());

afterAll(async () => {
  await cleanDBTrails();
  db.end();
});

describe("POST on the trail route", () => {
  it("should answer with 201 status when it is able to insert the trail json into the database", async () => {
    const body = [
      { dayOne: { morning: "Gaming", afternoon: "Gaming", night: "Gaming" } },
      { dayTwo: { morning: "Gaming", afternoon: "Gaming", night: "Gaming" } },
      { dayThree: { morning: "Gaming", afternoon: "Gaming", night: "Gaming" } },
    ];

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjA3NjIzOTQ2LCJleHAiOjE2MDc3OTY3NDZ9.neMh-a2sGK1XuefTEPiSI_LJKNABaKtvA8TmbYMNLew";

    const res = await supertest(app)
    .post("/api/trails/post-trails")
    .set({ "x-access-token": token })
    .send(body);
    

    expect(res.status).toBe(201);
  });
});
