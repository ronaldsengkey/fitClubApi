'use strict';


/**
 * join membership
 * 
 *
 * token String account id of member device
 * memberCat String name of the mamber
 * returns List
 **/
exports.joinMember = function(token,memberCat) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "code" : 0,
  "type" : "type",
  "message" : "message",
  "data" : {
    "token" : "ABCDEFGHIJKLMNOPQ2344222"
  }
}, {
  "code" : 0,
  "type" : "type",
  "message" : "message",
  "data" : {
    "token" : "ABCDEFGHIJKLMNOPQ2344222"
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * fee of membership
 * 
 *
 * token String token of member device
 * classId String token of member device
 * returns List
 **/
exports.memberActivity = function(token,classId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "code" : 0,
  "type" : "type",
  "message" : "message",
  "data" : {
    "token" : "ABCDEFGHIJKLMNOPQ2344222"
  }
}, {
  "code" : 0,
  "type" : "type",
  "message" : "message",
  "data" : {
    "token" : "ABCDEFGHIJKLMNOPQ2344222"
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * fee of membership
 * 
 *
 * token Integer token of member device
 * returns List
 **/
exports.memberFee = function(token) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "code" : 0,
  "type" : "type",
  "message" : "message",
  "data" : {
    "token" : "ABCDEFGHIJKLMNOPQ2344222"
  }
}, {
  "code" : 0,
  "type" : "type",
  "message" : "message",
  "data" : {
    "token" : "ABCDEFGHIJKLMNOPQ2344222"
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

