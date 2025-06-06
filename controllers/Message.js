'use strict';
// Import the necessary functions for the Message service
var utils = require('../utils/writer.js');
var Message = require('../service/MessageService');

// Handles POST request to send a message in a chat
module.exports.sendMessage = function sendMessage (req, res, __, body) {
  Message.sendMessage(body, req.openapi.pathParams.sender_id, req.openapi.pathParams.chat_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};