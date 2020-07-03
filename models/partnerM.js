const con = require('../config/dbConfig');
let query = '',
    message = '';

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
}

function partnerMembership(data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = '';
            switch (data.param) {
                case "account":
                    query = "SELECT m.*, u.name as memberName,mc.categoryName as memberCategory, p.name as placeName FROM member m JOIN membercategory mc ON mc.id = m.memberCat JOIN place p ON p.id = m.placeId JOIN user u ON u.id = m.userId WHERE p.partnerId = " + parseInt(data.profile.partnerId) + "";
                    break;
                case "payment":
                    query = "SELECT m.*, u.name as memberName,mc.categoryName as memberCategory, p.name as placeName, mp.nominal, mp.paymentVia, mp.bankId FROM member m JOIN membercategory mc ON mc.id = m.memberCat JOIN place p ON p.id = m.placeId JOIN user u ON u.id = m.userId LEFT JOIN memberpayment mp ON mp.userId = u.id WHERE p.partnerId = " + parseInt(data.profile.partnerId) + "";
                    break;
            }
            await con.query(query, (err, result) => {
                if (err) {
                    console.log("error get data", err)
                    message = {
                        "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                        "responseMessage": process.env.INTERNALERROR_MESSAGE
                    };
                    resolve(message);
                } else {
                    if (result.length > 0) {
                        message = {
                            "responseCode": process.env.SUCCESS_RESPONSE,
                            "responseMessage": process.env.SUCCESS_MESSAGE,
                            "data": result
                        };
                        resolve(message);
                    } else {
                        message = {
                            "responseCode": process.env.NOTFOUND_RESPONSE,
                            "responseMessage": process.env.DATANOTFOUND_MESSAGE
                        };
                        resolve(message);
                    }
                }
            })
        } catch (err) {
            console.log("error of partner member", err)
        }
    })
}

exports.partnerMember = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let pm = '';
            pm = await partnerMembership(data);
            // switch(data.param){
            //     case "account":
            //         pm = await partnerMembership(data);
            //         break;
            //     case "payment":
            //         pm = await partnerMemberPayment(data);
            //         break;
            // }
            resolve(pm);
        } catch (err) {
            console.log("error of partner member", err)
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": process.env.INTERNALERROR_MESSAGE
            }
            reject(message);
        }
    })
}


exports.placeList = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = "SELECT * FROM place";
            if (data.profile.partnerId !== null) {
                query += ' WHERE partnerId = ' + data.profile.partnerId;
            } else if (data.placeId) {
                query += ' WHERE id = ' + data.placeId;
            } else if (data.profile.placeId !== null) {
                query += ' WHERE id = ' + data.profile.placeId;
            }
            await con.query(query, (err, result) => {
                if (err) {
                    console.log("error get data", err)
                } else {
                    if (result.length > 0) {
                        message = {
                            "responseCode": process.env.SUCCESS_RESPONSE,
                            "responseMessage": process.env.SUCCESS_MESSAGE,
                            "data": result
                        };
                        resolve(message);
                    } else {
                        message = {
                            "responseCode": process.env.NOTFOUND_RESPONSE,
                            "responseMessage": process.env.DATANOTFOUND_MESSAGE
                        };
                        resolve(message);
                    }
                }
            })
        } catch (err) {
            console.log("error get class", err)
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": process.env.INTERNALERROR_MESSAGE
            };
            resolve(message);
        }
    })
}

exports.addPlace = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            console.log('data join partner => ', data)
            const qp = "INSERT INTO place SET ?";
            let newData = {
                "name": data.placeName,
                "location": data.address,
                "partnerId": parseInt(data.profile.partnerId)
            };
            con.query(qp, newData, (err, result) => {
                if (!err) {
                    if (result.affectedRows > 0) {
                        message = {
                            "responseCode": process.env.SUCCESS_RESPONSE,
                            "responseMessage": process.env.SUCCESS_MESSAGE
                        }
                        resolve(message)
                    } else {
                        message = {
                            "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                            "responseMessage": process.env.INTERNALERROR_MESSAGE
                        }
                        resolve(message)
                    }
                } else {
                    console.log("created schedule error", err);
                    message = {
                        "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                        "responseMessage": process.env.INTERNALERROR_MESSAGE
                    }
                    resolve(message)
                }
            });
        } catch (err) {
            console.log("error create schedule", err);
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": process.env.INTERNALERROR_MESSAGE
            }
            resolve(message);
        }
    })
}