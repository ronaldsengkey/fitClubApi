var utils = require('../utils/writer.js');
var model = require('../models/partnerM');
var jwt = require('jsonwebtoken');
const fs = require('fs');
let response = {};

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

module.exports.partnerMember = async function partnerMember(req, res, next) {
  let token = req.swagger.params['token'].value;
  let param = req.swagger.params['param'].value;
  let data = {};
  try {
    if (token !== null) {
      let a = await checkToken(token);
      data.profile = a;
      data.param = param;
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
          response = await model.partnerMember(data);
          break;
      }
      utils.writeJson(res, response);
    }
  } catch (err) {
    console.log("error get member of partner", err);
  }
}


module.exports.placeList = async function placeList(req, res, next) {
  let token = req.swagger.params['token'].value;
  let placeId = req.swagger.params['placeId'].value;

  let body = {};
  try {
    if (token) {
      body.token = token;
      let a = await checkToken(token);
      body.profile = a;
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
          response = await model.placeList(body);
          break;
      }
    }
    if (placeId) {
      body.placeId
      response = await model.placeList(body);
    }


    // switch (a) {
    //   case process.env.UNAUTHORIZED_RESPONSE:
    //     response = {
    //       "responseCode": process.env.UNAUTHORIZED_RESPONSE,
    //       "responseMessage": process.env.UNAUTH_MESSAGE
    //     }
    //     break;
    //   case process.env.ERRORINTERNAL_RESPONSE:
    //     response = {
    //       "responseCode": process.env.UNAUTHORIZED_RESPONSE,
    //       "responseMessage": process.env.UNAUTH_MESSAGE
    //     }
    //     break
    //   default:
    //     break;
    // }
    utils.writeJson(res, response);
  } catch (err) {
    console.log(err);
    utils.writeJson(res, err);
  }
};

module.exports.addPlace = async function addPlace(req, res, next) {
  var token = req.swagger.params['token'].value;
  var data = req.swagger.params['body'].value;
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
        response = await model.addPlace(data);
        break;
    }
    utils.writeJson(res, response);
  } catch (err) {
    console.log(err);
    utils.writeJson(res, err);
  }
}

module.exports.partnerProfile = async function partnerProfile(req, res, next) {
  var token = req.swagger.params['token'].value;
  let data = {};
  try {
    if (token !== null) {
      let a = await checkToken(token);
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
          data.profile = a;
          let b = await model.getSchedule(data);
          response = b;
          break;
      }
      utils.writeJson(res, response);
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