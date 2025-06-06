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
  // t.context.got = got.extend({ responseType: "json", prefixUrl: `https://bookfellas.onrender.com` });
});

// Close the server after tests are done
test.after.always((t) => {
  t.context.server.close();
});

// Test case for getting a book by valid ID
test("GET /book/{id} - Should return a book for a valid ID", async (t) => {
    const {body, statusCode} = await t.context.got("book/0");
    t.is(statusCode, 200, "Response status should be 200");
    t.is(body.id, 0, "Book ID should match the requested ID");
    t.is(body.title, "title", "Book title should be correct");
    t.is(body.author, "author", "Book author should be correct");
    t.is(body.isbn, "isbn", "Book ISBN should be correct");
    t.is(body.publishedDate, "2000-01-23", "Book published date should be correct");
});
  
// Test case for invalid ID format (string)
test("GET /book/{id} - Should return 400 error for invalid ID format (string)", async (t) => {
  const error = await t.throwsAsync(() => t.context.got("book/invalid")); 
  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, 'request.params.id should be integer');
});

// Test case for invalid ID format (float)
test("GET /book/{id} - Should return 400 error for invalid ID format (float)", async (t) => {
  const error = await t.throwsAsync(() => t.context.got("book/1.5"));
  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, 'request.params.id should be integer');
});

// Test case for non-existent book ID
test("GET /book/{id} - Should return 404 error for non-existent book ID", async (t) => {
  const error = await t.throwsAsync(() => t.context.got("book/999"));
  t.is(error.response.statusCode, 404);
  t.is(error.response.body, 'Book not found');
});