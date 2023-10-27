const app = require("../app"); // Link to your server file
const supertest = require("supertest");

const mongoose = require("mongoose");
const databaseName = "test";

beforeAll(done => {
  done()
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close()
  done()
})


it("Existing endpoint", async () => {
  const response = await supertest(app).get("/devices");
  expect(response.status).toBe(200);
  console.log(response.body)
});

test("Non-existent endpoint", async () => {
	const response = await supertest(app).get("/foo");
	expect(response.status).toBe(404);
});
