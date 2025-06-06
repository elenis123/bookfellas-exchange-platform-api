const test = require('ava');
const got = require('got');
const app = require('../index.js');
const http = require('http');

// Get the server up and running
test.before(async (t) => {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  t.context.server = server;
  t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:8080` });
});

// Close the server after the tests
test.after.always((t) => {
  t.context.server.close();
});

// Happy path: Test GET /likelist/{userId} should return likelist info, a list of books, and statusCode 200
test("GET /likelist /{userId} Should return likelist info, a list of books and statusCode 200", async (t) => {
  userId = 88;
  const { body, statusCode } = await t.context.got(`likelist/${userId}`);
  t.is(statusCode, 200);
  t.is(body.id, 456);
  t.is(body.userId, userId);
  t.is(body.likedBooks[0].author, "Stephen King");
  t.is(body.likedBooks[0].isbn, "12345");
  t.is(body.likedBooks[0].id, 89);
  t.is(body.likedBooks[0].publishedDate, "2000-01-23");
  t.is(body.likedBooks[0].title, "Misery");
  t.is(body.likedBooks[1].author, "Alasdair Gray");
  t.is(body.likedBooks[1].isbn, "654321");
  t.is(body.likedBooks[1].id, 99);
  t.is(body.likedBooks[1].publishedDate, "2099-01-23");
  t.is(body.likedBooks[1].title, "Poor Things");
});

// Unhappy path: Test GET /likelist/{userId} should return statusCode 400 because of invalid id (string)
test("GET /likelist /{userid} Should return statusCode 400 because of invalid id (string) ", async (t) => {
  invalid_id_string = "Eimai_ena_invalid_id";
  const error = await t.context.got(`likelist/${invalid_id_string}`, {
    throwHttpErrors: false,
  });

  t.is(error.statusCode, 400);
});

// Unhappy path: Test GET /likelist/{userId} should return statusCode 400 because of invalid id (float)
test("GET /likelist /{userid} Should return statusCode 400 because of invalid id (float) ", async (t) => {
  invalid_id_float = 8.25;
  const error = await t.context.got(`likelist/${invalid_id_float}`, {
    throwHttpErrors: false,
  });

  t.is(error.statusCode, 400);
});

// Unhappy path: Test GET /likelist/{non_existent_userId} should return 404 User not found
test("GET /likelist /{non_existent_userid} Should return 404 User not found ", async (t) => {
  non_existent_userid = 111;
  const error = await t.context.got(`likelist/${non_existent_userid}`, {
    throwHttpErrors: false,
  });

  t.is(error.statusCode, 404);
  t.is(error.body, 'User not found');
});