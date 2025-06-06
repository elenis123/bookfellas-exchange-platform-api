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

// Test case for valid library ID
test("GET /library/{id}/book - Should return a list of books for a valid library ID", async (t) => {
  const { body, statusCode } = await t.context.got("library/1/book");
  t.is(statusCode, 200, "Response status should be 200");
  t.true(Array.isArray(body), "Response body should be an array");
  t.true(body.length > 0, "Book list should not be empty");

  const book = body[0];
  t.not(book.id, undefined, "Each book should have an ID");
  t.not(book.title, undefined, "Each book should have a title");
  t.not(book.author, undefined, "Each book should have an author");
  t.not(book.isbn, undefined, "Each book should have an ISBN");
});

// Test case for invalid library ID format (string)
test("GET /library/{id}/book - Should return 400 error for invalid library ID format (string)", async (t) => {
  const error = await t.throwsAsync(() => t.context.got("library/invalid/book"));
  t.is(error.response.statusCode, 400, "Response status should be 400");
  t.is(error.response.body.message, "request.params.id should be integer", "Error message should indicate invalid ID format");
});

// Test case for invalid library ID format (float)
test("GET /library/{id}/book - Should return 400 error for invalid library ID format (float)", async (t) => {
  const error = await t.throwsAsync(() => t.context.got("library/1.5/book"));
  t.is(error.response.statusCode, 400, "Response status should be 400");
  t.is(error.response.body.message, "request.params.id should be integer", "Error message should indicate invalid ID format");
});

// Test case for non-existent library ID
test("GET /library/{id}/book - Should return 404 error for non-existent library ID", async (t) => {
  const error = await t.throwsAsync(() => t.context.got("library/9999/book")); // Use an unlikely ID
  t.is(error.response.statusCode, 404, "Response status should be 404");
  t.is(error.response.body.message, "Library not found", "Error message should indicate the library was not found");
});
