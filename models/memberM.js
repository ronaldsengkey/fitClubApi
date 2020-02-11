const con = require('../config/dbConfig');
let query = '',
    message = '';

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
}

exports.joinMember = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            console.log('data join member => ', data)
            const otp = generateOtp();
            let endDate = new Date();
            let day = new Date(endDate.setDate(endDate.getDate() + 30));
            let expDay = day.getDate();
            let expMonth = day.getMonth() + 1;
            let expYear = day.getFullYear();
            const checkMember = "SELECT userId,status FROM member WHERE userId = ? AND memberCat = ? AND status = ?"
            con.query(checkMember, [data.id, data.memberCat, 1], (err, result) => {
                if (!err) {
                    if (result.affectedRows > 0) { //if user already joined member
                        message = {
                            "responseCode": process.env.NOTACCEPT_RESPONSE,
                            "responseMessage": "You have already joined member!",
                            "data": result
                        }
                        resolve(message)
                    } else { //if user not joined member yet
                        const jm = "INSERT INTO member SET ?";
                        con.query(jm, {
                            "userId": parseInt(data.profile.id),
                            "code": otp,
                            "memberCat": parseInt(data.memberCat),
                            "endDate": expYear + '-' + expMonth + '-' + expDay,
                            "status": 0
                        }, (err, result) => {
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
                                        "responseMessage": process.env.ERRORSCHEDULE_MESSAGE
                                    }
                                    resolve(message)
                                }
                            } else {
                                console.log("Join member something error => ", err);
                            }
                        })
                    }
                } else {
                    console.log("something error when checking member => ", err);
                }
            })
        } catch (err) {
            console.log("error join member", err);
            reject(err);
        }
    })
}

exports.activity = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            console.log("DATA JOIN ACTIVITY => ", data);
            const query = "INSERT INTO memberactivity SET ?";
            con.query(query, {
                "memberId": parseInt(data.profile.memberId),
                "scheduleId": data.scheduleId,
                "action": data.action
            }, (err, result) => {
                if (!err) {
                    if (result.affectedRows > 0) {
                        console.log('success join activity');
                        message = {
                            "responseCode": process.env.SUCCESS_RESPONSE,
                            "responseMessage": process.env.SUCCESS_MESSAGE
                        }
                        resolve(message)
                    } else {
                        console.log('Something problem when join activity')
                        message = {
                            "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                            "responseMessage": process.env.ERRORSCHEDULE_MESSAGE
                        }
                        resolve(message)
                    }
                } else {
                    console.log("created schedule error", err);
                }
            })
        } catch (err) {
            console.log("error create schedule", err);
            reject(err);
        }
    })
}


exports.memberFee = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            const memberFee = "SELECT mf.id, mc.categoryName as category, mf.memberCat as catId, mf.fee, mf.timePeriode FROM memberfee mf JOIN membercategory mc ON mc.id = mf.memberCat";
            con.query(memberFee, (err, result) => {
                if (!err) {
                    if (result.length > 0) {
                        console.log('Success get member fee');
                        message = {
                            "responseCode": process.env.SUCCESS_RESPONSE,
                            "responseMessage": process.env.SUCCESS_MESSAGE,
                            "data": result
                        }
                        resolve(message);
                    } else {
                        console.log('Member fee is not found')
                        message = {
                            "responseCode": process.env.NOTFOUND_RESPONSE,
                            "responseMessage": process.env.DATANOTFOUND_MESSAGE
                        }
                        resolve(message);
                    }
                } else {
                    console.log("created schedule error", err);
                }
            })
        } catch (err) {
            console.log("error create schedule", err);
            reject(err);
        }
    })
}

exports.personalRecord = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            console.log(data)
            const pr = "INSERT INTO personalrecord SET ?";
            await con.query(pr, {
                "memberId": parseInt(data.profile.id),
                "prCat": parseInt(data.prCat),
                "value": data.dataValue
            }, (err, result) => {
                if (!err) {
                    if (result.affectedRows > 0) {
                        console.log('Success create personal record');
                        message = {
                            "responseCode": process.env.SUCCESS_RESPONSE,
                            "responseMessage": process.env.SUCCESS_MESSAGE
                        }
                        resolve(message)
                    } else {
                        message = {
                            "responseCode": process.env.SUCCESS_RESPONSE,
                            "responseMessage": process.env.ERRORSCHEDULE_MESSAGE
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

exports.getPersonalRecord = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            if (data.param == "all") {
                const pr = "SELECT * FROM personalrecord pr INNER JOIN member m ON pr.memberId = m.id INNER JOIN user u ON u.id = m.userId INNER JOIN personalrecordcategory prc ON prc.id = pr.prCat";
                await con.query(pr, (err, result) => {
                    if (!err) {
                        if (result.length > 0) {
                            console.log("Success get all personal record")
                            message = {
                                "responseCode": process.env.SUCCESS_RESPONSE,
                                "responseMessage": process.env.SUCCESS_MESSAGE,
                                "data": result
                            }
                            resolve(message)
                        } else {
                            message = {
                                "responseCode": process.env.NOTFOUND_RESPONSE,
                                "responseMessage": process.env.DATANOTFOUND_MESSAGE
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
            } else {
                let prc = JSON.parse(data.param);
                console.log('PRC => ', prc)
                const pr = "SELECT * FROM personalrecord pr INNER JOIN member m ON pr.memberId = m.id INNER JOIN user u ON u.id = m.userId INNER JOIN personalrecordcategory prc ON prc.id = pr.prCat WHERE pr.prCat = ?";
                await con.query(pr, [prc.prCat], (err, result) => {
                    if (!err) {
                        if (result.length > 0) {
                            console.log("Success get personal record by category")
                            message = {
                                "responseCode": process.env.SUCCESS_RESPONSE,
                                "responseMessage": process.env.SUCCESS_MESSAGE,
                                "data": result
                            }
                            resolve(message)
                        } else {
                            message = {
                                "responseCode": process.env.NOTFOUND_RESPONSE,
                                "responseMessage": process.env.DATANOTFOUND_MESSAGE
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
            }
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

exports.getPersonalRecordCategory = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            const pr = "SELECT * FROM personalrecordcategory";
            await con.query(pr, (err, result) => {
                if (!err) {
                    if (result.length > 0) {
                        console.log("Success get personal record category")
                        message = {
                            "responseCode": process.env.SUCCESS_RESPONSE,
                            "responseMessage": process.env.SUCCESS_MESSAGE,
                            "data": result
                        }
                        resolve(message)
                    } else {
                        console.log('Get personal record category is not found')
                        message = {
                            "responseCode": process.env.NOTFOUND_RESPONSE,
                            "responseMessage": process.env.DATANOTFOUND_MESSAGE
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