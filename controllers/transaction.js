'use strict';

let utils = require('../utils/writer.js');
let transaction = require('../models/transactionM');
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
            transaction.memberPayment(body)
                .then(function (response) {
                    utils.writeJson(res, response);
                })
                .catch(function (response) {
                    utils.writeJson(res, response);
                });
        }
    })
};