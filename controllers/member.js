'use strict';

let utils = require('../utils/writer.js');
let Member = require('../models/memberM');
let ct = require('../service/checkToken');



module.exports.joinMember = function joinMember(req, res, next) {
  var body = req.swagger.params['body'].value;
  console.log(body.token)
  ct.checkToken(body).then(function (response) {
    if (response.responseCode == process.env.UNAUTHORIZED_RESPONSE) {
      utils.writeJson(res, response);
    } else {
      body.profile = response.profile;
      Member.joinMember(body)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
        });
    }
  }).catch(function (response) {
    utils.writeJson(res, response);
  });
};

module.exports.memberActivity = function memberActivity(req, res, next) {
  var body = req.swagger.params['body'].value;
  ct.checkToken(body).then(function (response) {
    if (response == process.env.UNAUTHORIZED_RESPONSE) {
      utils.writeJson(res, response);
    } else {
      body.profile = response.profile;
      Member.activity(body)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
        });
    }
  }).catch(function (response) {
    utils.writeJson(res, response);
  });
};

module.exports.memberFee = function memberFee(req, res, next) {
  var token = req.swagger.params['token'].value;
  let body = {"token":token};
  ct.checkToken(body).then(function (response) {
    if (response.responseCode == process.env.UNAUTHORIZED_RESPONSE) {
      utils.writeJson(res, response);
    } else {
      body.profile = response.profile;
      Member.memberFee(token)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
    }
  });
};


module.exports.personalRecord = function personalRecord(req, res, next) {
  var body = req.swagger.params['body'].value;
  ct.checkToken(body).then(function (response) {
    if (response.responseCode == process.env.UNAUTHORIZED_RESPONSE) {
      utils.writeJson(res, response);
    } else {
      body.profile = response.profile;
      Member.personalRecord(body)
        .then(function (response) {
          utils.writeJson(res, response);
        })
        .catch(function (response) {
          utils.writeJson(res, response);
        });
    }
  }).catch(function (response) {
    utils.writeJson(res, response);
  });
};