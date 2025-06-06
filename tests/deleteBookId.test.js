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
  // Configure the got instance with the base URL and DELETE method
  t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:8080`, method: "DELETE" });
  // Uncomment the line below to use the production server
  // t.context.got = got.extend({ responseType: "json", prefixUrl: `https://bookfellas.onrender.com`, method: "DELETE" });
});

// Close the server after all tests have run
test.after.always((t) => {
  t.context.server.close();
});

// Test case for deleting a book with a valid ID
test("DELETE /book/{id} - Should return a book for a valid ID", async (t) => {
  const {body, statusCode} = await t.context.got("book/0");
  t.is(statusCode, 200, "Response status should be 200");
});

// Test case for deleting a book with an invalid ID format (string)
test("DELETE /book/{id} - Should return 400 error for invalid ID format (string)", async (t) => {
  const error = await t.throwsAsync(() => t.context.got("book/invalid")); 
  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, 'request.params.id should be integer');
});

// Test case for deleting a book with an invalid ID format (float)
test("DELETE /book/{id} - Should return 400 error for invalid ID format (float)", async (t) => {
  const error = await t.throwsAsync(() => t.context.got("book/1.5"));
  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, 'request.params.id should be integer');
});

// Test case for deleting a book with a non-existent ID
test("DELETE /book/{id} - Should return 404 error for non-existent book ID", async (t) => {
  const error = await t.throwsAsync(() => t.context.got("book/999"));
  t.is(error.response.statusCode, 404);
  t.is(error.response.body, 'Book not found');
});