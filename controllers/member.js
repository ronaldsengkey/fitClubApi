'use strict';

let utils = require('../utils/writer.js');
let Member = require('../models/memberM');
let ct = require('../service/checkToken');
const fs = require('fs');
var jwt = require('jsonwebtoken');

let privateKEY = fs.readFileSync('./private.key', 'utf8');
let publicKEY = fs.readFileSync('./public.key', 'utf8');
let i = 'FitClub Network'; // Issuer 
let s = 'agnetiuslee@gmail.com'; // Subject 
let a = 'http://fitclub.id'; // Audience

// SIGNING OPTIONS
let signOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: "1h",
  algorithm: "RS256"
};

module.exports.joinMember = function joinMember(req, res, next) {
  var body = req.swagger.params['body'].value;
  ct.checkToken(body.token).then(function (response) {
    if (response.responseCode == process.env.UNAUTHORIZED_RESPONSE) {
      utils.writeJson(res, response);
    } else {
      body.profile = response.profile;
      Member.joinMember(body)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
        });
    }
  }).catch(function (response) {
    utils.writeJson(res, response);
  });
};

module.exports.deletePersonalRecordCategory = async function deletePersonalRecordCategory(req, res, next) {
  let token = req.swagger.params['token'].value;
  await jwt.verify(token, publicKEY, signOptions, function (err, callback) {
    if (err) {
      console.log("not valid", err);
      response = {
        "responseCode": process.env.UNAUTHORIZED_RESPONSE,
        "responseMessage": process.env.UNAUTH_MESSAGE
      }
      utils.writeJson(res, response);
    } else {
      console.log(req.swagger.params['body'].value);
      Member.deletePersonalRecordCategory(req.swagger.params['body'].value)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
      });
    }
  });
}

module.exports.createPersonalRecordCategory = async function createPersonalRecordCategory(req, res, next) {
  let token = req.swagger.params['token'].value;
  await jwt.verify(token, publicKEY, signOptions, function (err, callback) {
    if (err) {
      console.log("not valid", err);
      response = {
        "responseCode": process.env.UNAUTHORIZED_RESPONSE,
        "responseMessage": process.env.UNAUTH_MESSAGE
      }
      utils.writeJson(res, response);
    } else {
      Member.createPersonalRecordCategory(req.swagger.params['body'].value)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
      });
    }
  });
}

module.exports.getPersonalRecord = async function getPersonalRecord(req, res, next) {
  var token = req.swagger.params['token'].value;
  var param = req.swagger.params['param'].value;
  let body = {};
  let response = {};
  await jwt.verify(token, publicKEY, signOptions, function (err, callback) {
    if (err) {
      console.log("not valid", err);
      response = {
        "responseCode": process.env.UNAUTHORIZED_RESPONSE,
        "responseMessage": process.env.UNAUTH_MESSAGE
      }
      utils.writeJson(res, response);
    } else {
      body.profile = callback;
      body.param = param;
      Member.getPersonalRecord(body)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
        });
    }
  })
};

module.exports.getPersonalRecordCategory = async function getPersonalRecordCategory(req, res, next) {
  var token = req.swagger.params['token'].value;
  // var body = req.swagger.params['body'].value;
  let body = {};
  let response = {};
  await jwt.verify(token, publicKEY, signOptions, function (err, callback) {
    if (err) {
      console.log("not valid", err);
      response = {
        "responseCode": process.env.UNAUTHORIZED_RESPONSE,
        "responseMessage": process.env.UNAUTH_MESSAGE
      }
      utils.writeJson(res, response);
    } else {
      body.profile = callback.profile;
      Member.getPersonalRecordCategory(body)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
        });
    }
  })
};

module.exports.memberActivity = function memberActivity(req, res, next) {
  var body = req.swagger.params['body'].value;
  ct.checkToken(body.token).then(function (response) {
    if (response.responseCode == process.env.UNAUTHORIZED_RESPONSE) {
      utils.writeJson(res, response);
    } else {
      body.profile = response.profile;
      Member.activity(body)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
    }
  }).catch(function (response) {
    utils.writeJson(res, response);
  });
};

module.exports.memberFee = function memberFee(req, res, next) {
  var token = req.swagger.params['token'].value;
  // let body = {
  //   "token": token
  // };
  let body = {};
  ct.checkToken(token).then(function (response) {
    if (response.responseCode == process.env.UNAUTHORIZED_RESPONSE) {
      utils.writeJson(res, response);
    } else {
      body.profile = response.profile;
      Member.memberFee(token)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
        });
    }
  });
};


module.exports.personalRecord = function personalRecord(req, res, next) {
  var token = req.swagger.params['token'].value;
  var body = req.swagger.params['body'].value;
  ct.checkToken(token).then(function (response) {
    if (response.responseCode == process.env.UNAUTHORIZED_RESPONSE) {
      utils.writeJson(res, response);
    } else {
      body.profile = response.profile;
      Member.personalRecord(body)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
        });
    }
  }).catch(function (response) {
    utils.writeJson(res, response);
  });
};