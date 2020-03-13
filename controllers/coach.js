var utils = require('../utils/writer.js');
var model = require('../models/coachM');
var jwt = require('jsonwebtoken');
const fs = require('fs');

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

async function checkToken(token) {
  try {
    let a = await jwt.verify(token, publicKEY, signOptions);
    if (a) {
      return a;
    } else {
      console.log("not valid", a)
      return process.env.UNAUTHORIZED_RESPONSE;
    }
  } catch (err) {
    console.log("error check token", err);
    return process.env.ERRORINTERNAL_RESPONSE;
  }
}

module.exports.coachUpdate = async function coachUpdate(req, res, next) {
  var token = req.swagger.params['token'].value;
  var param = req.swagger.params['param'].value;
  var body = req.swagger.params['body'].value;
  let response = {};
  let data = {};
  data = body;
  data.param = param;
  if(token != '' && token != undefined){
    try {
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
          response = await model.coachUpdate(data);
          break;
      }
      utils.writeJson(res, response);
    }catch(err){
      console.log("error get coach list", err);
      response = {
        "responseCode": process.env.ERRORINTERNAL_RESPONSE,
        "responseMessage": process.env.INTERNALERROR_MESSAGE
      }
      utils.writeJson(res, response);
    }
  }else{
    response = {
      "responseCode": process.env.UNAUTHORIZED_RESPONSE,
      "responseMessage": process.env.UNAUTH_MESSAGE
    }
    utils.writeJson(res, response);
  }
}

module.exports.coachList = async function coachList(req, res, next) {
  var token = req.swagger.params['token'].value;
  var param = req.swagger.params['param'].value;
  let response = {};
  let data = {};
  console.log('PARAM COACH => ', param)
  let b = JSON.parse(param);
  data.param = b;
  try {
    let a = await checkToken(token);
    data.profile = a;
    switch (a) {
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
        response = await model.coachList(data);
        break;
    }
    utils.writeJson(res, response);
  } catch (err) {
    console.log("error get coach list", err);
    response = {
      "responseCode": process.env.ERRORINTERNAL_RESPONSE,
      "responseMessage": process.env.INTERNALERROR_MESSAGE
    }
    utils.writeJson(res, response);
  }
}

module.exports.getSchedule = async function getSchedule(req, res, next) {
  const token = req.swagger.params['token'].value;
  const filter = req.swagger.params['filter'].value;
  const classStatus = req.swagger.params['classStatus'].value;
  let response = {};
  let data = {};
  try {
    if (token !== null) {
      await jwt.verify(token, publicKEY, signOptions, function (err, callback) {
        if (err) {
          console.log("not valid", err);
          response = {
            "responseCode": process.env.UNAUTHORIZED_RESPONSE,
            "responseMessage": process.env.UNAUTH_MESSAGE
          }
          utils.writeJson(res, response);
        } else {
          data.profile = callback;
          if(filter){
            data.filter = filter;
          }
          if(classStatus){
            data.classStatus = classStatus;
          }
          model.getSchedule(data)
            .then(function (response) {
              utils.writeJson(res, response);
            })
            .catch(function (response) {
              utils.writeJson(res, response);
            });
        }
      })
    } else {
      response = {
        "responseCode": process.env.ERRORINTERNAL_RESPONSE,
        "responseMessage": process.env.ERRORSCHEDULE_MESSAGE
      }
      utils.writeJson(res, response);
    }

  } catch (err) {
    console.log(err);
    utils.writeJson(res, err);
  }
};

module.exports.createSchedule = async function createSchedule(req, res, next) {
  const token = req.swagger.params['token'].value;
  var body = req.swagger.params['body'].value;
  let response = {};
  try {
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
          model.createSchedule(body)
            .then(function (response) {
              utils.writeJson(res, response);
            })
            .catch(function (response) {
              utils.writeJson(res, response);
            });
        }
      })
    } else {
      response = {
        "responseCode": process.env.ERRORINTERNAL_RESPONSE,
        "responseMessage": process.env.ERRORSCHEDULE_MESSAGE
      }
      utils.writeJson(res, response);
    }

  } catch (err) {
    console.log(err);
    utils.writeJson(res, err);
  }
};


// =============> start coach activity

module.exports.activity = async function activity(req, res, next) {
  var body = req.swagger.params['body'].value;
  let response = {};
  try {
    if (body.token !== null) {
      jwt.verify(body.token, process.env.KREDENTIAL_KEY, function (err, callback) {
        if (err) {
          response = {
            "responseCode": process.env.UNAUTHORIZED_RESPONSE,
            "responseMessage": process.env.UNAUTH_MESSAGE
          }
          utils.writeJson(res, response);
        } else {
          console.log("valid");
          body.profile = callback.profile;
          model.activity(body)
            .then(function (response) {
              utils.writeJson(res, response);
            })
            .catch(function (response) {
              utils.writeJson(res, response);
            });
        }
      })
    } else {
      response = {
        "responseCode": process.env.ERRORINTERNAL_RESPONSE,
        "responseMessage": process.env.ERRORSCHEDULE_MESSAGE
      }
      utils.writeJson(res, response);
    }

  } catch (err) {
    console.log(err);
    utils.writeJson(res, err);
  }
};

// =============> end coach activity