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
                case "membershipRequest":
                    query = "SELECT m.*, u.name as memberName,mc.categoryName as memberCategory, p.name as placeName, f.transactionId, tmp.nominal, tmp.bankId, tmp.paymentVia FROM member m JOIN membercategory mc ON mc.id = m.memberCat JOIN place p ON p.id = m.placeId JOIN user u ON u.id = m.userId JOIN temppayment tmp ON tmp.userId = u.id JOIN file f ON f.ownerId = u.id AND f.transactionId = tmp.id WHERE m.status = 0 AND p.partnerId = " + parseInt(data.profile.partnerId) + "";
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

exports.partnerOperation = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = '';
            console.log(data);
            switch (data.param) {
                case "memberActivation":
                    query = "UPDATE member SET status = ? WHERE userId = ? AND code = ? AND placeId = ?";
                    let param = [data.status, data.userId, data.memberCode, data.placeId];
                    await con.query(query, param, async function (err, result) {
                        if (err) {
                            console.log("ERRRORRR", err);
                            message = {
                                responseCode: process.env.ERRORINTERNAL_RESPONSE,
                                responseMessage: process.env.INTERNALERROR_MESSAGE,
                            };
                            resolve(message);
                        } else {
                            if (result.affectedRows > 0) {

                                let tmpu = 'UPDATE temppayment SET status = ? WHERE id = ? AND userId = ? AND nominal = ? AND bankId = ? AND placeId = ?';
                                const tmpp = [1, data.transactionId, data.userId, data.nominal, data.bankId, data.placeId];
                                const tmpur = await con.query(tmpu, tmpp);
                                console.log(tmpur);
                                console.log(tmpp);

                                let mp = 'insert into memberpayment set ? ';
                                const na = {
                                    userId: data.userId,
                                    nominal: data.nominal,
                                    memberCat: data.memberCat,
                                    bankId: data.bankId,
                                    paymentVia: data.paymentMethod
                                };
                                const mpc = await con.query(mp, na);

                                if (mpc && tmpur) {
                                    // console.log("check coach =>", mpc);
                                    message = {
                                        responseCode: process.env.SUCCESS_RESPONSE,
                                        responseMessage: process.env.SUCCESS_MESSAGE,
                                    };
                                    resolve(message);
                                } else {
                                    message = {
                                        responseCode: process.env.NOTFOUND_RESPONSE,
                                        responseMessage: process.env.DATANOTFOUND_MESSAGE,
                                    };
                                    resolve(message);
                                }
                            } else {
                                message = {
                                    responseCode: process.env.NOTFOUND_RESPONSE,
                                    responseMessage: process.env.DATANOTFOUND_MESSAGE,
                                };
                                resolve(message);
                            }
                        }
                    })
                    break;
            }
        } catch (err) {
            console.log(err)
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": process.env.INTERNALERROR_MESSAGE
            }
            resolve(message);
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
            resolve(message);
        }
    })
}


exports.placeList = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = "SELECT * FROM place";
            if (data == "") {
                query = query;
            } else {
                if (data.profile.partnerId) {
                    query += ' WHERE partnerId = ' + data.profile.partnerId;
                }
                if (data.placeId) {
                    query += ' WHERE id = ' + data.placeId;
                }
                if (data.profile.placeId) {
                    query += ' WHERE id = ' + data.profile.placeId;
                }
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