const supertest = require("supertest");

const app = require("../app");
const db = require("../database");
const { generateTestUser } = require("../utils/testHelperFuncs");

let user;

async function cleanDB() {
  try {
    await db.query("DELETE FROM trails");
    await db.query("DELETE FROM users");
  } catch (error) {
    console.log(error);
  }
}

beforeAll(async () => {
  await cleanDB();
  user = await generateTestUser("hotel");
});

afterAll(async () => {
  await cleanDB();
  db.end();
});

describe("POST on the trail route", () => {
  it("should answer with 201 status when it is able to insert the trail json into the database", async () => {
    const body = [
      { dayOne: { morning: "Gaming", afternoon: "Gaming", night: "Gaming" } },
      { dayTwo: { morning: "Gaming", afternoon: "Gaming", night: "Gaming" } },
      { dayThree: { morning: "Gaming", afternoon: "Gaming", night: "Gaming" } },
    ];

    const res = await supertest(app)
      .post("/api/trails/post-trails")
      .set({ "x-access-token": user.token })
      .send(body);

    expect(res.status).toBe(201);
  });
});
