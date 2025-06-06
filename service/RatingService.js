'use strict';


/**
 * Delete rating by ID
 * Delete a rating by its ID
 *
 * id UUID ID of the rating
 * no response value expected for this operation
 **/
exports.deleteRatingById = function(id) {
  return new Promise(function(resolve, reject) {
    
    if(id === 555){
      reject({statusCode: 404, body: 'Rating not found'});
    } else{
      resolve();
    }

  });
}


/**
 * Get rating by ID
 * Retrieve a rating's details by its ID
 *
 * id UUID ID of the rating
 * returns Rating
 **/
exports.getRatingById = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "createdAt" : "createdAt",
  "raterID" : 123456,
  "rating" : 1,
  "comment" : "comment",
  "id" : id,
  "userId" : 654321
};
    if (id === 555) {
      reject({statusCode: 404, body: 'Rating not found'});
    } else {
      resolve(examples[Object.keys(examples)[0]]);
    }
  });
}


/**
 * Update rating by ID
 * Update a rating's details by its ID
 *
 * body UpdateRatingRequest Update the details of an existing rating
 * id UUID ID of the rating
 * returns Rating
 **/
exports.updateRatingById = function(_,__) {
  return new Promise(function(resolve, _) {
    var examples = {};
    examples['application/json'] = {
  "createdAt" : "createdAt",
  "raterID" : 86256325632563,
  "rating" : 1,
  "comment" : "comment",
  "id" : 9632547,
  "userId" : 14786214856
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

