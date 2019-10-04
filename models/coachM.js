const con = require('../config/dbConfig');
let query = '',
message='';
exports.createSchedule = function (data) {
    return new Promise( async function (resolve, reject) {
        try {
            const otp = "INSERT INTO classschedule SET ?";
            con.query(otp, {"class":parseInt(data.classId), "coach":parseInt(data.profile.id), "startDate":data.startDate, "endDate":data.endDate, "startTime":data.startTime, "endTime":data.endTime}, (err, result) => {
                if (!err) {
                    if (result.affectedRows > 0) {
                        message = {"responseCode":process.env.SUCCESS_RESPONSE,"responseMessage":process.env.SUCCESS_MESSAGE}
                        resolve(message)
                    }else{
                        message = {"responseCode":process.env.SUCCESS_RESPONSE,"responseMessage":process.env.ERRORSCHEDULE_MESSAGE}
                        resolve(message)
                    }
                }else{
                    console.log("created schedule error", err);
                }
            })
        }catch(err){
            console.log("error create schedule", err);
            reject(err);
        }
    })
}

exports.activity = function (data) {
    return new Promise( async function (resolve, reject) {
        try {
            const otp = "INSERT INTO coachactivity SET ?";
            con.query(otp, {"classScheduleId":parseInt(data.classId)}, (err, result) => {
                if (!err) {
                    if (result.affectedRows > 0) {
                        message = {"responseCode":process.env.SUCCESS_RESPONSE,"responseMessage":process.env.SUCCESS_MESSAGE}
                        resolve(message)
                    }else{
                        message = {"responseCode":process.env.SUCCESS_RESPONSE,"responseMessage":process.env.ERRORSCHEDULE_MESSAGE}
                        resolve(message)
                    }
                }else{
                    console.log("created schedule error", err);
                }
            })
        }catch(err){
            console.log("error create schedule", err);
            reject(err);
        }
    })
}