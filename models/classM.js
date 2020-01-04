const db = require('../config/dbConfig');
let query = '',
    message = '';
    
exports.classList = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = "SELECT * FROM classlist";
            await db.query(query, (err, result) => {
                if (err) {
                    console.log("error get data", err)
                } else {
                    if (result.length > 0) {
                        console.log(result);
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
            reject(message);
        }
    })
}


exports.memberClassHistory = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = "SELECT * FROM memberactivity ma JOIN classschedule cs ON cs.class = ma.classId JOIN classlist cl ON cl.id = cs.class JOIN coach c ON c.id = cs.coach JOIN user u ON u.id = c.userId WHERE ma.membercat = ?";
            await db.query(query,[data.profile.memberCat], (err, result) => {
                if (err) {
                    console.log("error get member class", err)
                        message = {
                            "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                            "responseMessage": process.env.INTERNALERROR_MESSAGE
                        };
                        reject(message);
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
            reject(message);
        }
    })
}

exports.memberClass = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = "SELECT ma.*, cs.class as classId, cs.coach as coachId, u1.name as coachName, cs.startTime, cs.endTime, cs.startDate, cs.endDate, c.name as className from memberactivity ma JOIN classschedule cs ON cs.id = ma.scheduleId JOIN classlist c ON c.id = cs.class JOIN coach co ON co.id = cs.coach JOIN user u1 ON u1.id = co.userId JOIN member m ON m.id = ma.memberId JOIN user u2 ON u2.id = ma.memberId WHERE u2.id = ? AND m.userid = ?";
            console.log(data);
            await db.query(query,[data.profile.id, data.profile.id], (err, result) => {
                if (err) {
                    console.log("error get member class", err)
                        message = {
                            "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                            "responseMessage": process.env.INTERNALERROR_MESSAGE
                        };
                        reject(message);
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
            reject(message);
        }
    })
}


exports.classDetail = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            // console.log(data);
            let query = "SELECT * FROM classlist WHERE id = '"+data.classId+"'";
            await db.query(query,(err, result) => {
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
            reject(message);
        }
    })
}