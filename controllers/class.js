var utils = require('../utils/writer.js');
var model = require('../models/classM');
const fs = require('fs');
var jwt = require('jsonwebtoken');

let privateKEY = fs.readFileSync('./private.key', 'utf8');
let publicKEY = fs.readFileSync('./public.key', 'utf8');
let i = process.env.ISSUER; // Issuer 
let s = process.env.SUBJECT; // Subject 
let a = process.env.AUDIENCE; // Audience

// SIGNING OPTIONS
let signOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: "1h",
  algorithm: "RS256"
};

async function checkToken(token){
  try{
    let a = await jwt.verify(token, publicKEY, signOptions);
    if (a){
      return a ;
    }else{
      console.log("not valid",a)
      return process.env.UNAUTHORIZED_RESPONSE;
    }
  }catch(err){
    console.log("error check token", err);
    return process.env.ERRORINTERNAL_RESPONSE;
  }
}

module.exports.partnerClass = async function partnerClass(req, res, next) {
  let token = req.swagger.params['token'].value;
  let param = req.swagger.params['param'].value;
  try{
    let response = {};
    let data = {};
    let b = JSON.parse(param);
    data.param = b;
    let a = await checkToken(token);
    data.profile = a;
    switch(a){
      case process.env.UNAUTHORIZED_RESPONSE:
        response = {
          "responseCode": process.env.UNAUTHORIZED_RESPONSE,
          "responseMessage": process.env.UNAUTH_MESSAGE
        } 
        break;
      case process.env.ERRORINTERNAL_RESPONSE:
        response = {
          "responseCode": process.env.UNAUTHORIZED_RESPONSE,
          "responseMessage": process.env.UNAUTH_MESSAGE
        }
        break
      default:
        response = await model.partnerClass(data);
        break;
    }
    utils.writeJson(res, response);
  }catch(err){
    console.log("error get schedule on partner place", err)
  }
}

module.exports.memberClassHistory = function memberClassHistory(req, res, next) {
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
        body.profile = callback;
        model.memberClassHistory(body)
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

module.exports.classList = function classList(req, res, next) {
  let token = req.swagger.params['token'].value;
  let param = {};
  if(req.swagger.params['param'].value){
    param.param = req.swagger.params['param'].value;
  }else if(req.swagger.params['byClassId'].value){
    param.classId = req.swagger.params['byClassId'].value;
  }else if(req.swagger.params['byDate'].value){
    param.Date = req.swagger.params['byDate'].value;
  }
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
          body.byClassId = param.classId;
          body.byDate = param.date;
          body.param = param.param;
          body.profile = callback;
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

module.exports.placeList = function placeList(req, res, next) {
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
        model.placeList(body)
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
        console.log("not valid", err);
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
        console.log("not valid", err);
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