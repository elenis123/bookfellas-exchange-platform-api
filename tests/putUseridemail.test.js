const test = require("ava");
const got = require("got");
const app = require("../index.js");
const http = require("http");

test.before(async (t) => {
    const server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, resolve));
    const { port } = server.address();
    t.context.server = server;
    t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:8080` });
  });
  
  test.after.always((t) => {
    t.context.server.close();
  })

// Test data
const userId = 14; // Example user ID for testing
const validEmailData = { email: "newemail@example.com" };

// Test for successful email update
test("PUT /user/{id}/email - Successful email update", async (t) => {
  const response = await t.context.got.put(`user/${userId}/email`, {
    json: validEmailData,
  });
  
  t.is(response.statusCode, 200, "Response status should be 200 for successful email update");
});

// Test for invalid email format
test("PUT /user/{id}/email - Invalid email format", async (t) => {
  const invalidEmailData = { email: 112 };

  const response = await t.context.got.put(`user/${userId}/email`, {
    json: invalidEmailData,
    throwHttpErrors: false,
  });
  t.is(response.statusCode, 400, "Response should be 400 for invalid email format");
  t.is(response.body.message, "request.body.email should be string");
});

// Test for non-existent user ID
test("PUT /user/{id}/email - Non-existent user ID", async (t) => {
  const nonExistentUserId = "99999";
  const response = await t.context.got.put(`user/${nonExistentUserId}/email`, {
    json: validEmailData,
    throwHttpErrors: false,
  });
  t.is(response.statusCode, 404, "Response should be 404 for non-existent user ID");
  t.is(response.body.message, "User not found");
});

// Test for missing email in request body
test("PUT /user/{id}/email - Missing email in request body", async (t) => {
    const response = await t.context.got.put(`user/${userId}/email`, {
    json: {}, // No email provided
    throwHttpErrors: false,
  });
  t.is(response.statusCode, 400, "Response should be 400 for missing email");
  t.is(response.body.message, "request.body should have required property 'email'");
});