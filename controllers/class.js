var utils = require('../utils/writer.js');
var model = require('../models/classM');
const fs   = require('fs');
var jwt = require('jsonwebtoken');

let privateKEY  = fs.readFileSync('./private.key', 'utf8');
let publicKEY  = fs.readFileSync('./public.key', 'utf8');
let i  = 'FitClub Network';          // Issuer 
let s  = 'agnetiuslee@gmail.com';        // Subject 
let a  = 'http://fitclub.id'; // Audience

// SIGNING OPTIONS
let signOptions = {
  issuer:  i,
  subject:  s,
  audience:  a,
  expiresIn:  "1h",
  algorithm:  "RS256"
};

module.exports.classList = function classList(req, res, next) {
  let token = req.swagger.params['token'].value;
  let body = {};
  body.token = token;
  if (token !== null) {
    jwt.verify(token, publicKEY, signOptions, function (err, callback) {
      if (err) {
        console.log("not valid", err);
        response = {
          "responseCode": process.env.UNAUTHORIZED_RESPONSE,
          "responseMessage": process.env.UNAUTH_MESSAGE
        }
        utils.writeJson(res, response);
      } else {
        console.log("valid");
        body.profile = callback.profile;
        model.classList(body)
          .then(function (response) {
            utils.writeJson(res, response);
          })
          .catch(function (response) {
            utils.writeJson(res, response);
          });
      }
    })
  }
};


module.exports.memberClass = function memberClass(req, res, next) {
  let token = req.swagger.params['token'].value;
  let body = {};
  if (token !== null) {
    jwt.verify(token, publicKEY, signOptions, function (err, callback) {
      if (err) {
        console.log("not valid" , err);
        response = {
          "responseCode": process.env.UNAUTHORIZED_RESPONSE,
          "responseMessage": process.env.UNAUTH_MESSAGE
        }
        utils.writeJson(res, response);
      } else {
        body.profile = callback;
        model.memberClass(body)
          .then(function (response) {
            utils.writeJson(res, response);
          })
          .catch(function (response) {
            utils.writeJson(res, response);
          });
      }
    })
  }
};

module.exports.classDetail = function classDetail(req, res, next) {
  let token = req.swagger.params['token'].value;
  let classId = req.swagger.params['classId'].value;
  let body = {
    "token": token,
    "classId": classId
  };
  if (token !== null) {
    jwt.verify(token, publicKEY, signOptions, function (err, callback) {
      if (err) {
        console.log("not valid" , err);
        response = {
          "responseCode": process.env.UNAUTHORIZED_RESPONSE,
          "responseMessage": process.env.UNAUTH_MESSAGE
        }
        utils.writeJson(res, response);
      } else {
        console.log("valid");
        body.profile = callback.profile;
        model.classDetail(body)
          .then(function (response) {
            utils.writeJson(res, response);
          })
          .catch(function (response) {
            utils.writeJson(res, response);
          });
      }
    })
  }
};