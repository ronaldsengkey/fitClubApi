const db = require('../config/dbConfig');
let query = '',
    message = '';

exports.classSchedule = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = "SELECT * FROM classschedule cs JOIN place p ON p.id = cs.placeId WHERE p.partnerId = ?";
            await db.query(query,[data.profile.id],(err, result) => {
                if (err) {
                    console.log("error get data", err)
                } else {
                    if (result.length > 0) {
                        console.log(result);
                    }
                }
            });
        }catch(err){
            console.log(err)
        }
    })
}

exports.partnerClass = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = "SELECT * FROM classschedule cs JOIN place p ON p.id = cs.placeId WHERE p.partnerId = ?";
            await db.query(query,[data.profile.id],(err, result) => {
                if (err) {
                    console.log("error get data", err)
                } else {
                    if (result.length > 0) {
                        console.log(result);
                    }
                }
            });
        }catch(err){
            console.log(err)
        }
    })
}

exports.classList = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query ='';
            if(data.param){
                query = "SELECT * FROM classlist";
            }
            if(data.byClassId){
                query = "SELECT c.name, c.id FROM classlist c WHERE c.id IN ("+data.byClassId+") GROUP BY c.id";
            }
            await db.query(query, (err, result) => {
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

exports.placeList = function () {
    return new Promise(async function (resolve, reject) {
        try {
            let query = "SELECT * FROM place";
            await db.query(query, (err, result) => {
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

exports.coachClassHistory = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            console.log(data);
            let query = "SELECT ma.*, cs.class as classId, cs.coach as coachId, u1.name as coachName, cs.startTime, cs.endTime, cs.startDate, cs.endDate, c.name as className from memberactivity ma JOIN classschedule cs ON cs.id = ma.scheduleId JOIN classlist c ON c.id = cs.class JOIN coach co ON co.id = cs.coach AND cs.coach = '"+data.profile.coachId+"' JOIN user u1 ON u1.id = co.userId WHERE u1.id = ? AND co.userid = ?";
            await db.query(query, [data.profile.id, data.profile.id], (err, result) => {
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
                            "responseMessage": "You don't have any history class yet"
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
            let query = "SELECT ma.*, cs.class as classId, cs.coach as coachId, u1.name as coachName, cs.startTime, cs.endTime, cs.startDate, cs.endDate, c.name as className from memberactivity ma JOIN classschedule cs ON cs.id = ma.scheduleId JOIN classlist c ON c.id = cs.class JOIN coach co ON co.id = cs.coach JOIN user u1 ON u1.id = co.userId JOIN member m ON m.id = ma.memberId JOIN user u2 ON u2.id = ma.memberId WHERE u2.id = ? AND m.userid = ?";
            await db.query(query, [data.profile.id, data.profile.id], (err, result) => {
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
                            "responseMessage": "You don't have any history class yet"
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

exports.memberClassBooked = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query ="SELECT * FROM memberactivity ma JOIN classschedule cs ON cs.id = ma.scheduleId JOIN member m ON m.id = ma.memberId AND ma.memberId = '"+data.profile.memberId+"' WHERE m.userId = '"+data.profile.id+"'";
            await db.query(query, [data.profile.memberCat], (err, result) => {
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
        }catch(err){
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
            let query = "SELECT cm.*, c.name, c.descript, ch.id as coachid, u.name as coachname, u.gender as coachgender FROM classmember cm JOIN classlist c ON c.id JOIN classschedule cs ON cs.class = c.id JOIN coach ch ON ch.id = cs.coach JOIN user u ON u.id = ch.userId WHERE cm.membercat = ?";
            await db.query(query, [data.profile.memberCat], (err, result) => {
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
            let query = "SELECT *,u.name as coachName,cs.id as scheduleId, cl.name as className FROM classlist cl INNER JOIN classschedule cs ON cs.class = cl.id INNER JOIN coach c ON c.id = cs.coach INNER JOIN user u ON u.id = c.userId WHERE cl.id = '" + data.classId + "'";
            await db.query(query, (err, result) => {
                if (err) {
                    console.log("error get data", err)
                } else {
                    if (result.length > 0) {
                        message = {
                            "responseCode": process.env.SUCCESS_RESPONSE,
                            "responseMessage": process.env.SUCCESS_MESSAGE,
                            "data": result[0]
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