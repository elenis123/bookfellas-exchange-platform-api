'use strict';
// Add the necessary imports 
var utils = require('../utils/writer.js');
var Chat = require('../service/ChatService');

// Handles GET request to retrieve a chat by ID
module.exports.getChatById = function getChatById(_, res, __, id) {
  Chat.getChatById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
    // Return error codes
      if (error.status === 404) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
};

// Handles GET request to retrieve messages in a chat by sender ID and chat ID
module.exports.getMessagesInChat = function getMessagesInChat (req, res, __) {
  Chat.getMessagesInChat(req.openapi.pathParams.sender_id, req.openapi.pathParams.chat_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Handles GET request to list all chats for a sender ID
module.exports.listChats = function listChats (_, res, __, sender_id) {
  Chat.listChats(sender_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Handles POST request to start a new chat
module.exports.startChat = function startChat (req, res, __, body) {
  Chat.startChat(body, req.openapi.pathParams.sender_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Handles PUT request to update a chat by ID
module.exports.updateChatById = function updateChatById (req, res, __, body) {
  Chat.updateChatById(body, req.openapi.pathParams.id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Handles PUT request to update a message in a chat by sender ID and chat ID
module.exports.updateMessageInChat = function updateMessageInChat (req, res, __, body) {
  Chat.updateMessageInChat(body, req.openapi.pathParams.sender_id, req.openapi.pathParams.chat_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};