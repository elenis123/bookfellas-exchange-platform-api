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

// Close the server after tests are done
test.after.always((t) => {
  t.context.server.close();
});

// Test case for valid chat ID
test("GET /chat/{id} - Should return a chat for a valid ID", async (t) => {
    const {body, statusCode} = await t.context.got("chat/486525632586");
    t.is(statusCode, 200, "Response status should be 200");
    t.is(body.id, 486525632586, "Chat ID should match the requested ID");
    t.deepEqual(body.messages[0], {
      "id": 1478525896,
      "sender_id": 6,
      "content": "content",
      "timestamp": "2000-01-23T04:56:07.000+00:00"
    }, "First message in the chat should match the expected message");
    t.is(body.participants.length, 2, "Chat should have 2 participants");
});

// Test case for invalid chat ID format (string)
test("GET /chat/{id} - Should return 400 error for invalid ID format (string)", async (t) => {
  const error = await t.throwsAsync(() => t.context.got("chat/invalid"));
  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, 'request.params.id should be integer');
});

// Test case for invalid chat ID format (float)
test("GET /chat/{id} - Should return 400 error for invalid ID format (float)", async (t) => {
  const error = await t.throwsAsync(() => t.context.got("chat/486525632586.5"));
  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, 'request.params.id should be integer');
});

// Test case for non-existent chat ID
test("GET /chat/{id} - Should return 404 error for non-existent chat ID", async (t) => {
  const error = await t.throwsAsync(() => t.context.got("chat/999"));
  t.is(error.response.statusCode, 404);
  t.deepEqual(error.response.body, { message: "Chat not found" });
});
