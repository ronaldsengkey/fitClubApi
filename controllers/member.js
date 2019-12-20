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
  console.log('TOKEN ' ,body.token)
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

module.exports.getPersonalRecord = async function getPersonalRecord(req, res, next) {
  var token = req.swagger.params['token'].value;
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
      console.log("valid => ", callback);
      body.profile = callback.profile;
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

module.exports.memberActivity = function memberActivity(req, res, next) {
  var body = req.swagger.params['body'].value;
  ct.checkToken(body).then(function (response) {
    if (response == process.env.UNAUTHORIZED_RESPONSE) {
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
  let body = {
    "token": token
  };
  ct.checkToken(body).then(function (response) {
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
  var body = req.swagger.params['body'].value;
  ct.checkToken(body).then(function (response) {
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