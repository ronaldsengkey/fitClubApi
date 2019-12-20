'use strict';
var jwt = require('jsonwebtoken');
let response = {};

const fs = require('fs');

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

exports.checkToken = function (data) {
  return new Promise(async function (resolve, reject) {
    try {
      let res = {};
      await jwt.verify(data.toString(), publicKEY, signOptions, function (err, callback) {
        if (err) {
          console.log("not valid => ", err);
          response = {
            "responseCode": process.env.UNAUTHORIZED_RESPONSE,
            "responseMessage": process.env.UNAUTH_MESSAGE
          }
          resolve(response);
        } else {
          console.log("valid => ", callback);
          res.profile = callback;
          resolve(res);
        }
      });
    } catch (err) {
      console.log("error check token", err);
    }
  });
}