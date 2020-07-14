'use strict';

var utils = require('../utils/writer.js');
var model = require('../models/accountM');
let data = '';

module.exports.loginAccess = async function login (req, res, next) {
  var body = req.swagger.params['body'].value;
  var accountCat = req.swagger.params['accountCat'].value;
  body.accountCat = accountCat;
  try{
    await model.loginAccess(body)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  }catch(err){
    console.log(err);
    utils.writeJson(res, err);
  }
};

module.exports.addAccount = async function addAccount (req, res, next) {
  var body = req.swagger.params['body'].value;
  try{
    await model.addAccount(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
  }catch(err){
    utils.writeJson(res, err);
  }
  
};


module.exports.confirmation = async function confirmation (req, res, next) {
  let body = req.swagger.params['body'].value;
  try{
    let a = await model.confirmation(body);
    utils.writeJson(res, a);    
  }catch(err){
    utils.writeJson(res, err);
  }
}
