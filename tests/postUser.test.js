const test = require('ava');
const got = require('got');
const app = require('../index.js');
const http = require('http');

// Setup the server before running tests
test.before(async (t) => {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  t.context.server = server;
  t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:8080` });
});

// Close the server after running tests
test.after.always((t) => {
  t.context.server.close();
});

// Sample user data for testing
const userData = {
  userName: "userName",
  password: "password",
  confirmPassword: "password",
  email: "email"
};

// Test for successful creation of a user
test("POST /user - Successful creation of a user", async (t) => {
  const response = await t.context.got.post("user", {
    json: userData,
  });

  t.is(response.statusCode, 200, "Response status should be 201 for successful creation");
  t.is(response.body.userName, userData.userName, "userName should match the given userName");
  t.is(response.body.email, userData.email, "email should match the given email");
  t.is(response.body.password, userData.password, "password should match the given password");
  t.is(response.body.confirmPassword, userData.confirmPassword, "confirmPassword should match the given confirmPassword");
});

// Test for invalid data creation (example: missing data)
test("POST /user - Creation with missing data (confirmPassword)", async (t) => {
  const invalidData = { userName: "userName", password: "password", email: "email" }; // confirmPassword is required

  const response = await t.context.got.post("user", {
    json: invalidData,
    throwHttpErrors: false,
  });

  t.is(response.statusCode, 400, "Answer is 400 for invalid data");
  t.is(response.body.message, "request.body should have required property 'confirmPassword'");
  t.truthy(response.body, "body should not be empty");
});

// Test for malformed data (example: invalid body)
test("POST /user - Malformed data (invalid body)", async (t) => {
  const malformedData = "invalid-user-data"; // Invalid body (not JSON)

  const response = await t.context.got.post("user", {
    body: malformedData,
    throwHttpErrors: false,
  });

  t.true(response.statusCode === 415, "Answer should be 415 for malformed data");
  t.is(response.body.message, "unsupported media type undefined");
  t.truthy(response.body, "body should not be empty");
});
