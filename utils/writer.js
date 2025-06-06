// Constructor for ResponsePayload object
var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

// Function to create a ResponsePayload object with a given code and payload
exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

// Function to write a JSON response
var writeJson = exports.writeJson = function(response, arg1, arg2) {
  if (arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  var code = determineCode(arg1, arg2);
  var payload = determinePayload(arg1, code);

  writeResponse(response, code, payload);
}

// Helper function to determine the response code
function determineCode(arg1, arg2) {
  if (arg2 && Number.isInteger(arg2)) {
    return arg2;
  } else if (arg1 && Number.isInteger(arg1)) {
    return arg1;
  }
  return 200; // Default response code
}

// Helper function to determine the payload
function determinePayload(arg1, code) {
  if (code && arg1) {
    return arg1;
  } else if (arg1) {
    return arg1;
  }
  return null;
}

// Helper function to write the response
function writeResponse(response, code, payload) {
  if (typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }
  response.writeHead(code, {'Content-Type': 'application/json'});
  response.end(payload);
}