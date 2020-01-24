'use strict';

let utils = require('../utils/writer.js');
let model = require('../models/transactionM');
let ct = require('../service/checkToken');
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
  

module.exports.transactionRequest = async function transactionRequest(req, res, next) {
    var token = req.swagger.params['token'].value;
    let param = req.swagger.params['param'].value;
    let data = {};
    let response = {};
    data.param = param;
    try{
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
            response = await model.transactionRequest(data);
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
}

module.exports.memberPayment = async function memberPayment(req, res, next) {
    var token = req.swagger.params['token'].value;
    var body = req.swagger.params['body'].value;
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
            model.memberPayment(body)
                .then(function (response) {
                    utils.writeJson(res, response);
                })
                .catch(function (response) {
                    utils.writeJson(res, response);
                });
        }
    })
};

module.exports.getBank = async function getBank(req, res, next) {
    var token = req.swagger.params['token'].value;
    var param = req.swagger.params['param'].value;
    let body = {};
    let response = {};
    await jwt.verify(token, publicKEY, signOptions, function (err, callback) {
        if (err) {
            console.log("not valid token", err);
            response = {
                "responseCode": process.env.UNAUTHORIZED_RESPONSE,
                "responseMessage": process.env.UNAUTH_MESSAGE
            }
            utils.writeJson(res, response);
        } else {
            console.log("valid => ", callback);
            body.profile = callback.profile;
            body.param = param;
            transaction.getBank(body)
                .then(function (response) {
                    utils.writeJson(res, response);
                })
                .catch(function (response) {
                    utils.writeJson(res, response);
                });
        }
    })
};