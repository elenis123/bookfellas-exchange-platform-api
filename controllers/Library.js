'use strict';

var utils = require('../utils/writer.js');
var Library = require('../service/LibraryService');

// Handles GET request to retrieve a paginated list of libraries
module.exports.libraryGET = function libraryGET (_, res, __) {
  Library.libraryGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Handles GET request to retrieve a paginated list of books in a library by library ID
module.exports.libraryIdBookGET = function libraryIdBookGET(_, res, __, id) {
  Library.libraryIdBookGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    });
};

// Handles PUT request to update a book in a library by library ID
module.exports.libraryIdBookPUT = function libraryIdBookPUT(req, res, _, body) {
  Library.libraryIdBookPUT(body,  req.openapi.pathParams.id)
    .then(function (response) {
      res.status(200).json(response); // Send a success response with the updated book
    })
    .catch(function (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" }); // Send the error response
    });
};

// Handles GET request to retrieve a library by ID
module.exports.libraryIdGET = function libraryIdGET (_, res, __, id) {
  Library.libraryIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Handles PUT request to update a library by ID
module.exports.libraryIdPUT = function libraryIdPUT (req, res, __, body) {
  Library.libraryIdPUT(body,req.openapi.pathParams.id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
