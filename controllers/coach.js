var utils = require('../utils/writer.js');
var model = require('../models/coachM');
var jwt = require('jsonwebtoken');

module.exports.createSchedule = async function login(req, res, next) {
  var body = req.swagger.params['body'].value;
  let response = {};
  try {
    if (body.token !== null) {
      jwt.verify(body.token, process.env.KREDENTIAL_KEY, function (err, callback) {
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