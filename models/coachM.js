const con = require('../config/dbConfig');
let query = '',
    message = '';

exports.createSchedule = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            const otp = "INSERT INTO classschedule SET ?";
            con.query(otp, {
                "class": parseInt(data.classId),
                "coach": parseInt(data.profile.id),
                "startDate": data.startDate,
                "endDate": data.endDate,
                "startTime": data.startTime,
                "endTime": data.endTime
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
                            "responseCode": process.env.SUCCESS_RESPONSE,
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

exports.getSchedule = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = "SELECT cs.id as scheduleId ,u.id as coach_account_id,cl.name as class_name,u.name as coach_name,cs.coach as coach_id,cs.class as class_id,cs.startTime as class_start_time,cs.endTime as class_end_time,cs.startDate as class_start_date,cs.endDate as class_end_date FROM classschedule cs INNER JOIN classlist cl ON cs.class = cl.id INNER JOIN coach c ON c.id = cs.coach INNER JOIN user u ON u.id = c.userId";
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
            console.log("error create schedule", err);
            reject(err);
        }
    })
}

exports.activity = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            const otp = "INSERT INTO coachactivity SET ?";
            con.query(otp, {
                "classScheduleId": parseInt(data.classId)
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
                            "responseCode": process.env.NOTACCEPT_RESPONSE,
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