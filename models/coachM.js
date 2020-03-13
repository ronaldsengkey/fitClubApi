const con = require('../config/dbConfig');
let query = '',
    message ='';

    function switchResponse(data) {
        return new Promise(async function (resolve, reject) {
        query = "UPDATE switchschedulerequest SET status = ? WHERE toCoachId = ? AND id = ? ";
        let param = [data.action,data.profile.id, data.switchId];
        await con.query(query,param, async function (err, result){
            if (err) {
                console.log("error get data", err);
                message = {
                    "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                    "responseMessage": process.env.INTERNALERROR_MESSAGE
                };
                resolve(message);
            } else {
                if(result.affectedRows > 0){
                    message = {
                        "responseCode": process.env.SUCCESS_RESPONSE,
                        "responseMessage": process.env.SUCCESS_MESSAGE
                    };
                    resolve(message);
                }else{
                    console.log("error get data", result);
                    message = {
                        "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                        "responseMessage": process.env.INTERNALERROR_MESSAGE
                    };
                    resolve(message);
                }
            }
        })
    })
}

function actionClass(data) {
        return new Promise(async function (resolve, reject) {
        query = "INSERT INTO coachactivity SET ?";
        let param = {
            "scheduleId":data.scheduleId,
            "coachId":data.profile.id,
            "action":data.action
        }
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
                    message = {
                        "responseCode": process.env.SUCCESS_RESPONSE,
                        "responseMessage": process.env.SUCCESS_MESSAGE
                    };
                    resolve(message);
                }else{
                    message = {
                        "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                        "responseMessage": process.env.INTERNALERROR_MESSAGE
                    };
                    resolve(message);
                }
            }
        })
    })
}

async function getDateToday(){
    try{
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; 
        let yyyy = today.getFullYear();
        const fullDate = yyyy+'-'+mm+'-'+dd;
        return fullDate ;
    }catch(err){
        consoles.log("error geting date", err);
        return err;
    } 
}

function checkSwitchClassRequest(data) {
    return new Promise(async function (resolve, reject) {
        try{
            query = "SELECT id FROM switchschedulerequest WHERE fromCoachId = "+data.selfId+" AND toCoachId = "+data.targetCoach+" AND fromScheduleId = "+data.idSelfSchedule+" AND toScheduleId = "+data.targetSchedule;
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
                            "responseCode": process.env.NOTACCEPT_RESPONSE,
                            "responseMessage": "Oopss data already exists !"
                        };
                        resolve(message);
                    }else{
                        message = {
                            "responseCode": process.env.NOTFOUND_RESPONSE,
                            "responseMessage": process.env.DATANOTFOUND_MESSAGE
                        };
                        resolve(message);
                    }
                }
            })
        }catch(err){
            console.log("error check switch class",err);
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": process.env.INTERNALERROR_MESSAGE
            };
            resolve(message);
        }
    })
}

function updateCoachClassSchedule(data) {
    return new Promise(async function (resolve, reject) {
        try{
            let cscr = await checkSwitchClassRequest(data);
            switch(cscr.responseCode){
                case '404':
                    let today = await getDateToday();
                    query = "INSERT INTO switchschedulerequest SET ?";
                    let param = {
                        "fromCoachId": parseInt(data.selfId),
                        "toCoachId": parseInt(data.targetCoach),
                        "fromScheduleId": data.idSelfSchedule,
                        "toScheduleId": data.targetSchedule,
                        "requestDate": today
                    }
                    // query = "UPDATE classschedule SET coach = ? WHERE id = ?  ";
                    // let param = [data.targetCoach, data.idSelfSchedule];
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
                                message = {
                                    "responseCode": process.env.SUCCESS_RESPONSE,
                                    "responseMessage": process.env.SUCCESS_MESSAGE
                                };
                                resolve(message);
                                // let query2 = "UPDATE classschedule SET coach = ? WHERE id = ?  ";
                                // let param2 = [data.selfId, data.targetSchedule];
                                // await con.query(query2,param2,(err, result) => {
                                //     if(result.affectedRows > 0){
                                //         message = {
                                //             "responseCode": process.env.SUCCESS_RESPONSE,
                                //             "responseMessage": process.env.SUCCESS_MESSAGE
                                //         };
                                //         resolve(message);
                                //     }else{
                                //         message = {
                                //             "responseCode": process.env.NOTFOUND_RESPONSE,
                                //             "responseMessage": process.env.DATANOTFOUND_MESSAGE
                                //         };
                                //         reject(message);
                                //     }
                                // })
                            }else{
                                message = {
                                    "responseCode": process.env.NOTFOUND_RESPONSE,
                                    "responseMessage": process.env.DATANOTFOUND_MESSAGE
                                };
                                resolve(message);
                            }
                        }
                    })
                    break;
                default:
                    resolve(cscr);
                    break;
            }
        }catch(err){
            console.log("error switch class request", err);
        }
    })
}

exports.coachUpdate = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            switch(data.param){
                case "switchClass":
                    message = await updateCoachClassSchedule(data);
                    break;
                case "actionClass":
                    message = await actionClass(data);
                    break;
                case "switchClassResponse":
                    message = await switchResponse(data);
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
            console.log("kkkkkkkkkkkkkkkkk", data);
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
            console.log(query);
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
                "endTime": data.endTime,
                "placeId":parseInt(data.placeId)
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
            }else if (data.filter == "startedClass"){
                query = "SELECT ca.*, cs.startTime, cs.endTime, cs.startDate, cs.endDate, cs.placeId, p.name, p.location FROM `coachactivity` ca JOIN classschedule cs ON cs.id = ca.scheduleId JOIN place p ON p.id = cs.placeId  WHERE ca.coachId = "+data.profile.coachId+" AND ca.action = '"+data.filter+"'";
            }else if(data.filter =="switchRequest"){
                query = "SELECT scr.*, u1.name, cl1.name as className, cs1.startDate, cs1.endDate, cs1.startTime, cs1.endTime FROM switchschedulerequest scr JOIN coach c1 ON c1.id = scr.fromCoachId JOIN user u1 ON u1.id = c1.userId JOIN classschedule cs1 ON cs1.id = scr.fromScheduleId JOIN classlist cl1 ON cl1.id = cs1.class  WHERE scr.toCoachId = '"+data.profile.coachId+"'";
            }else{
                query = "SELECT cs.id as scheduleId ,u.id as coach_account_id,cl.name as class_name,u.name as coach_name,cs.coach as coach_id,cs.class as class_id,cs.startTime as class_start_time,cs.endTime as class_end_time,cs.startDate as class_start_date,cs.endDate as class_end_date FROM classschedule cs INNER JOIN classlist cl ON cs.class = cl.id INNER JOIN coach c ON c.id = cs.coach INNER JOIN user u ON u.id = c.userId WHERE c.id = '"+data.profile.coachId+"'";
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