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

async function checkToken(token){
  try{
    let a = await jwt.verify(token, publicKEY, signOptions);
    if (a){
      return a ;
    }else{
      return process.env.UNAUTHORIZED_RESPONSE;
    }
    // , function (err, callback) {
      // if (err) {
      //   console.log("not valid", err);
        // response = {
        //   "responseCode": process.env.UNAUTHORIZED_RESPONSE,
        //   "responseMessage": process.env.UNAUTH_MESSAGE
        // }
    //     return process.env.UNAUTHORIZED_RESPONSE;
    //   } else {
    //     console.log("valid => ", callback);
    //     return callback;
    //   }
    // })
  }catch(err){
    console.log("error check token", err);
    return process.env.ERRORINTERNAL_RESPONSE;
  }
}

module.exports.partnerProfile = async function partnerProfile(req, res, next) {
  var token = req.swagger.params['token'].value;
  let response = {};
  let data = {};
  try {
    if (token !== null) {
      let a = await checkToken(token);
      switch(a){
        case process.env.UNAUTHORIZED_RESPONSE:
          response = {
            "responseCode": process.env.UNAUTHORIZED_RESPONSE,
            "responseMessage": process.env.UNAUTH_MESSAGE
          } 
          break;
        case process.env.ERRORINTERNAL_RESPONSE:
          response = {
            "responseCode": process.env.ERRORINTERNAL_RESPONSE,
            "responseMessage": process.env.ERRORSCHEDULE_MESSAGE
          }
          break
        default:
          data.profile = a;
          let b = await model.getSchedule(data);
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
