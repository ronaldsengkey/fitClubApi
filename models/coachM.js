const con = require('../config/dbConfig');
let query = '',
    message ='';

function updateCoachClassSchedule(data) {
    return new Promise(async function (resolve, reject) {
    query = "UPDATE classschedule SET coach = ? WHERE id = ?  ";
    let param = [data.targetCoach, data.idSelfSchedule];
    await con.query(query,param, async function (err, result){
        if (err) {
            console.log("error get data", err)
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": process.env.INTERNALERROR_MESSAGE
            };
            resolve(message);
        } else {
            if(result.affectedRows > 0){
                let query2 = "UPDATE classschedule SET coach = ? WHERE id = ?  ";
                let param2 = [data.selfId, data.targetSchedule];
                await con.query(query2,param2,(err, result) => {
                    if(result.affectedRows > 0){
                        message = {
                            "responseCode": process.env.SUCCESS_RESPONSE,
                            "responseMessage": process.env.SUCCESS_MESSAGE
                        };
                        resolve(message);
                    }else{
                        message = {
                            "responseCode": process.env.NOTFOUND_RESPONSE,
                            "responseMessage": process.env.DATANOTFOUND_MESSAGE
                        };
                        reject(message);
                    }
                })
            }else{
                message = {
                    "responseCode": process.env.NOTFOUND_RESPONSE,
                    "responseMessage": process.env.DATANOTFOUND_MESSAGE
                };
                reject(message);
            }
        }
    })
})
}

exports.coachUpdate = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            switch(data.param){
                case "switchClass":
                    message = await updateCoachClassSchedule(data);
                    break;
            }
            resolve(message);
        }catch(err){
            console.log("error coachUpdate =>",err)
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": process.env.ERRORSCHEDULE_MESSAGE
            };
            reject(message);
        }
    })
}

exports.coachList = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = '';
            switch(data.param){
                case "all":
                    query = 'SELECT u.name, u.gender, u.phone, u.address, u.email, u.imgProfile, u.accountStatus, u.registerDate, p.name as placeName FROM classschedule cs JOIN coach c ON c.id = cs.coach JOIN user u ON u.id = c.userId JOIN place p ON p.id = cs.placeId WHERE p.partnerId = '+data.profile.partnerId+' GROUP BY u.id'
                    break;
                default:
                    if(data.param.byId){
                        query = 'SELECT u.name, u.gender, u.phone, u.address, u.email, u.imgProfile, u.accountStatus, u.registerDate, p.name as placeName FROM classschedule cs JOIN coach c ON c.id = cs.coach JOIN user u ON u.id = c.userId JOIN place p ON p.id = cs.placeId WHERE p.partnerId = '+data.profile.partnerId+' AND c.id = '+data.param.byId+' AND cs.coach = '+data.param.byId
                    }else if(data.param.byPlace){
                        query = 'SELECT u.name, u.gender, u.phone, u.address, u.email, u.imgProfile, u.accountStatus, u.registerDate, p.name as placeName FROM classschedule cs JOIN coach c ON c.id = cs.coach JOIN user u ON u.id = c.userId JOIN place p ON p.id = cs.placeId WHERE p.partnerId = '+data.profile.partnerId+' AND cs.placeId = '+data.param.byPlace+' GROUP BY u.id';
                    }else if(data.param.byClass){
                        query = 'SELECT u.name, u.gender, u.phone, u.address, u.email, u.imgProfile, u.accountStatus, u.registerDate, p.name as placeName FROM classschedule cs JOIN coach c ON c.id = cs.coach JOIN user u ON u.id = c.userId JOIN place p ON p.id = cs.placeId WHERE p.partnerId = '+data.profile.partnerId+' AND cs.class = '+data.param.byPlace+' GROUP BY u.id'
                    }
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
        }catch(err){
            console.log("error coach list", err);
            message = {
                "responseCode": process.env.NOTFOUND_RESPONSE,
                "responseMessage": process.env.DATANOTFOUND_MESSAGE
            };
            reject(message);
        }
    })
}

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
            reject(process.env.ERRORINTERNAL_RESPONSE);
        }
    })
}

exports.getSchedule = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = '';
            if(data.filter == "all"){
                query = "SELECT cs.id as scheduleId ,u.id as coach_account_id,cl.name as class_name,u.name as coach_name,cs.coach as coach_id,cs.class as class_id,cs.startTime as class_start_time,cs.endTime as class_end_time,cs.startDate as class_start_date,cs.endDate as class_end_date FROM classschedule cs INNER JOIN classlist cl ON cs.class = cl.id INNER JOIN coach c ON c.id = cs.coach INNER JOIN user u ON u.id = c.userId";
            }else{
                query = "SELECT cs.id as scheduleId ,u.id as coach_account_id,cl.name as class_name,u.name as coach_name,cs.coach as coach_id,cs.class as class_id,cs.startTime as class_start_time,cs.endTime as class_end_time,cs.startDate as class_start_date,cs.endDate as class_end_date FROM classschedule cs INNER JOIN classlist cl ON cs.class = cl.id INNER JOIN coach c ON c.id = cs.coach INNER JOIN user u ON u.id = c.userId WHERE c.id = '"+data.profile.id+"'     ";
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