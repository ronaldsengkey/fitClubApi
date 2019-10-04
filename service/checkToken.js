'use strict';
var jwt = require('jsonwebtoken');
let response = {};

exports.checkToken = function(data) {
  return new Promise(async function(resolve, reject) {
    try{
      await jwt.verify(data.token,process.env.KREDENTIAL_KEY,function(err,callback){
        if(err){
          console.log("not valid");
          response = {
              "responseCode":process.env.UNAUTHORIZED_RESPONSE,
              "responseMessage":process.env.UNAUTH_MESSAGE
          }
          resolve(response);
        }else{
            console.log("valid");
            data.profile = callback.profile;
            resolve(data);
        }
      });
    }catch(err){
      console.log("error check token", err);
    }
  });
}

