'use strict';


/**
 * Get like list by user ID
 * Retrieve the like list of the user with the given ID
 *
 * id UUID ID of the user
 * returns LikeList
 **/
exports.getLikeListByUserId = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "likedBooks" : [ {
    "author" : "Stephen King",
    "isbn" : "12345",
    "id" : 89,
    "publishedDate" : "2000-01-23",
    "title" : "Misery"
  }, {
    "author" : "Alasdair Gray",
    "isbn" : "654321",
    "id" : 99,
    "publishedDate" : "2099-01-23",
    "title" : "Poor Things"
  } ],
  "id" : 456,
  "userId" : userId
};

    if(userId === 111){
      reject({statusCode: 404, body: 'User not found'});
    } else{
      resolve(examples[Object.keys(examples)]);
    }

  });
}


/**
 * Update like list by user ID
 * Update the like list of the user with the given ID
 *
 * body LikeList Update the like list of an existing user
 * id UUID ID of the user
 * returns LikeList
 **/
exports.updateLikeListByUserId = function(_,__) {
  return new Promise(function(resolve, _) {
    var examples = {};
    examples['application/json'] = {
  "likedBooks" : [ {
    "author" : "author",
    "isbn" : "isbn",
    "id" : 0,
    "publishedDate" : "2000-01-23",
    "title" : "title"
  }, {
    "author" : "author",
    "isbn" : "isbn",
    "id" : 0,
    "publishedDate" : "2000-01-23",
    "title" : "title"
  } ],
  "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "userId" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

