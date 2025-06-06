const test = require('ava');
const got = require('got');
const app = require('../index.js');
const http = require('http');

// Setup the server before tests
test.before(async (t) => {
    const server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, resolve));
    const { port } = server.address();
    t.context.server = server;
    t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:8080` });
});

// Close the server after tests
test.after.always((t) => {
    t.context.server.close();
});

// Test data
const libraryId = 21; // Example library ID for testing
const validBookData = {
    author: "New Author",
    isbn: "1234567890",
    id: 5,
    publishedDate: "2023-10-10",
    title: "New Book",
};

// Test for successful book update in library
test("PUT /library/{id}/book - Successful book update", async (t) => {
    const response = await t.context.got.put(`library/${libraryId}/book`, {
        json: validBookData,
    });

    t.is(response.statusCode, 200, "Response status should be 200 for successful book update");
    t.deepEqual(response.body, validBookData, "Response body should match the updated book data");
});

// Test for invalid book data
test("PUT /library/{id}/book - Invalid book data", async (t) => {
    const invalidBookData = { isbn: 123456, title: null }; // Invalid fields

    const response = await t.context.got.put(`library/${libraryId}/book`, {
        json: invalidBookData,
        throwHttpErrors: false,
    });

    t.is(response.statusCode, 400, "Response status should be 400 for invalid book data");
    t.is(response.body.message, "request.body.title should be string, request.body.isbn should be string", 
        "Response message should indicate which fields are invalid");
});

// Test for non-existent library ID
test("PUT /library/{id}/book - Non-existent library ID", async (t) => {
    const nonExistentLibraryId = 99999; // Using a non-existent library ID
    const validBookData = { title: "New Book", isbn: "123456789" };

    const response = await t.context.got.put(`library/${nonExistentLibraryId}/book`, {
        json: validBookData,
        throwHttpErrors: false,
    });

    t.is(response.statusCode, 404, "Response status should be 404 for non-existent library ID");
    t.is(response.body.message, "Library not found", "Response message should indicate library not found");
});

// Test for missing book data
test("PUT /library/{id}/book - Missing book data", async (t) => {
    const response = await t.context.got.put(`library/${libraryId}/book`, {
        json: {}, // Empty body to simulate missing book data
        throwHttpErrors: false,
    });

    t.is(response.statusCode, 400, "Response status should be 400 for missing book data");
    t.is(response.body.message, "Missing book data: title, isbn, and author are required", 
        "Response message should indicate missing data");
});
