const con = require('../config/dbConfig');
let query = '',
    message = '';

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
}

exports.joinMember = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            const otp = generateOtp();
            let endDate = new Date();
            let day = new Date(endDate.setDate(endDate.getDate() + 30));
            let expDay = day.getDate();
            let expMonth = day.getMonth() + 1;
            let expYear = day.getFullYear();
            // console.log("MEMBER JOIN >>>>>>>>>", data)
            const checkMember = "SELECT userId,status FROM member WHERE userId = ? AND memberCat = ? AND status = ?"
            con.query(checkMember, [data.profile.id, data.memberCat, 1], (err, result) => {
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
                                message = {
                                    "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                                    "responseMessage": process.env.ERRORSCHEDULE_MESSAGE
                                }
                                resolve(message)
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


function checkingLimit(param) {
    return new Promise(async function (resolve, reject) {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        const fullDate = yyyy + "-" + mm + "-" + dd;
        const query = "SELECT COUNT(memberId) AS totalJoin FROM memberactivity WHERE action = 'join' AND DATE(dateRecord) = '" + fullDate + "' AND scheduleId = " + param.scheduleId;

        await con.query(query, async function (err, result) {
            if (err) {
                resolve(err);
            } else {
                if (result[0].totalJoin === null) {
                    resolve(0);
                } else {
                    const mp = "SELECT maxPerson FROM classschedule WHERE id = " + param.scheduleId;
                    await con.query(mp, async function (error, hasil) {
                        if (error) {
                            resolve(process.env.ERRORINTERNAL_RESPONSE);
                        } else {
                            let kuota = hasil[0].maxPerson - result[0].totalJoin
                            console.log("===========", kuota, hasil[0].maxPerson, result[0].totalJoin)
                            resolve(kuota);
                        }
                    })
                }
            }
        });
    });
}


exports.activity = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let cl = await checkingLimit(data);
            console.log("LIMITNYA", cl)
            if (cl > 0) {
                console.log("DATA JOIN ACTIVITY => ", data);
                const query = "INSERT INTO memberactivity SET ?";
                con.query(query, {
                    "memberId": parseInt(data.memberId),
                    "scheduleId": data.scheduleId,
                    "action": data.action
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
                        message = {
                            "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                            "responseMessage": "Request failed, please try again later"
                        }
                        resolve(message);
                    }
                })
            } else {
                message = {
                    "responseCode": process.env.NOTACCEPT_RESPONSE,
                    "responseMessage": "Oopss, request failed, class fulled"
                }
                resolve(message);
            }
        } catch (err) {
            console.log(err)
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": "Request failed, please try again later"
            }
            resolve(message)
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
                "memberId": parseInt(data.profile.memberId),
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
                const pr = "SELECT prc.categoryName, pr.value, pr.memberId, u.name as userName FROM personalrecord pr JOIN member m ON pr.memberId = m.id JOIN user u ON u.id = m.userId JOIN personalrecordcategory prc ON prc.id = pr.prCat WHERE pr.memberId = ? ";
                await con.query(pr, [data.profile.memberId], (err, result) => {
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

exports.deletePersonalRecordCategory = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            const query = "DELETE FROM `personalrecordcategory` WHERE `id` = ? ";
            con.query(query, data.idCategory,(err, result) => {
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
                    message = {
                        "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                        "responseMessage": process.env.INTERNALERROR_MESSAGE
                    }
                    resolve(message);
                }
            })
        }catch(err){
            console.log(err)
        }
    })
}

exports.createPersonalRecordCategory = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            const pc = "INSERT INTO personalrecordcategory SET ?";
            con.query(pc, {"categoryName":data.categoryName},(err, result) => {
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
                    message = {
                        "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                        "responseMessage": process.env.INTERNALERROR_MESSAGE
                    }
                    resolve(message);
                }
            })
        }catch(err){
            console.log(err)
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