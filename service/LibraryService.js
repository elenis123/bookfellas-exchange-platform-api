'use strict';


/**
 * Get a list of libraries
 *
 * pageNumber Integer  (optional)
 * pageSize Integer  (optional)
 * returns List
 **/
exports.libraryGET = function() {
  return new Promise(function(resolve, _) {
    var examples = {};
    examples['application/json'] = [ {
  "established" : "2000-01-23",
  "name" : "name",
  "librarian" : "librarian",
  "location" : "location",
  "id" : 21,
  "booksCount" : 2
}, {
  "established" : "2000-01-23",
  "name" : "name",
  "librarian" : "librarian",
  "location" : "location",
  "id" : 21,
  "booksCount" : 2
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a list of books in a specific library
 *
 * id UUID 
 * pageNumber Integer  (optional)
 * pageSize Integer  (optional)
 * returns List
 **/
exports.libraryIdBookGET = function (id) {
  return new Promise(function (resolve, reject) {
    const libraries = {
      1: [
        {
          author: "Author A",
          isbn: "123456789",
          id: 1,
          publishedDate: "2020-01-01",
          title: "Book A",
        },
        {
          author: "Author B",
          isbn: "987654321",
          id: 2,
          publishedDate: "2021-01-01",
          title: "Book B",
        },
      ],
    };

    if (libraries[id]) {
      resolve(libraries[id]); // Return the books for the library
    } else {
      reject({
        statusCode: 404,
        message: "Library not found",
      }); // Return 404 for non-existent libraries
    }
  });
};



/**
 * Updates a Library's book list. Use "add" or "remove" operation to update the list.
 *
 * body Book 
 * id UUID 
 * returns Book
 **/
exports.libraryIdBookPUT = function(body, id) {
  return new Promise(function(resolve, reject) {
    const libraries = {
      21: [
        {
          author: "Author A",
          isbn: "123456789",
          id: 1,
          publishedDate: "2020-01-01",
          title: "Book A",
        },
        {
          author: "Author B",
          isbn: "987654321",
          id: 2,
          publishedDate: "2021-01-01",
          title: "Book B",
        },
      ],
    };

    // Check if the library ID exists
    if (!libraries[id]) {
      reject({
        statusCode: 404,
        message: "Library not found",
      });
      return;
    }

    // Check if the required book fields are missing
    if (!body || !body.title || !body.isbn || !body.author) {
      reject({
        statusCode: 400,
        message: "Missing book data: title, isbn, and author are required",
      });
      return;
    }

    resolve(body); // If no issues, resolve with the book data
  });
};





/**
 * Get a Library by id
 *
 * id UUID 
 * returns Library
 **/
exports.libraryIdGET = function(_) {
  return new Promise(function(resolve, _) {
    var examples = {};
    examples['application/json'] = {
  "established" : "2000-01-23",
  "name" : "name",
  "librarian" : "librarian",
  "location" : "location",
  "id" : 21,
  "booksCount" : 36
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a library by ID
 *
 * body Library 
 * id UUID The ID of the library to update
 * returns Library
 **/
exports.libraryIdPUT = function(body,_) {
  return new Promise(function(resolve, _) {
    var examples = {};
    examples['application/json'] = {
  "established" : "2000-01-23",
  "name" : "name",
  "librarian" : "librarian",
  "location" : "location",
  "id" : 21,
  "booksCount" : 47
};
    if (Object.keys(examples).length > 0) {
      resolve(body);
    } else {
      resolve();
    }
  });
}

