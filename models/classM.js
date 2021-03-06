const db = require('../config/dbConfig');
let query = '',
    message = '';

exports.operation = function (data) {
    return new Promise(async function (resolve, reject) {
        let dataContent = '';
        let query = '';
        try {
            switch (data.m) {
                case "post":
                    query = "INSERT INTO classlist SET ?";
                    dataContent = {
                        name: data.className,
                        descript: data.description
                    }
                    break;
                case "delete":
                    query = "DELETE FROM `classlist` WHERE `id` = ? ";
                    dataContent = data.classId;
                    break;
            }
            db.query(
                query, dataContent,
                (err, result) => {
                    if (!err) {
                        if (result.affectedRows > 0) {
                            message = {
                                responseCode: process.env.SUCCESS_RESPONSE,
                                responseMessage: process.env.SUCCESS_MESSAGE,
                            };
                        } else {
                            message = {
                                responseCode: process.env.SUCCESS_RESPONSE,
                                responseMessage: process.env.ERRORSCHEDULE_MESSAGE,
                            };
                        }
                    }
                });
            resolve(message);
        } catch (err) {
            console.log(err);
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": process.env.INTERNALERROR_MESSAGE
            };
            resolve(message);
        }
    })
}

exports.classSchedule = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = "SELECT cs.id as scheduleId, cs.class as classId, c.name as className, cs.coach as coachId, u.name as coachName, cs.startTime, cs.endTime, cs.startDate, cs.endDate, cs.placeId FROM classschedule cs JOIN coach ch ON ch.id = cs.coach JOIN classlist c ON cs.class = c.id JOIN place p ON p.id = cs.placeId JOIN user u ON u.id = ch.userId ";
            if (data.param !== undefined) {
                query += "WHERE cs.startDate = '" + data.param.byDate + "'";
                if (data.param.filter !== undefined) {
                    switch (data.param.filter) {
                        case "byPlace":
                            query = "SELECT cs.id as scheduleId ,u.id as coach_account_id,cl.name as class_name,u.name as coach_name,cs.coach as coach_id,cs.class as class_id,cs.startTime as class_start_time,cs.endTime as class_end_time,cs.startDate as class_start_date,cs.endDate as class_end_date FROM classschedule cs INNER JOIN classlist cl ON cs.class = cl.id INNER JOIN coach c ON c.id = cs.coach INNER JOIN user u ON u.id = c.userId WHERE cs.placeId = " + data.param.place + " ORDER BY cs.id DESC";
                            break;
                        default:
                            query += " AND "
                            break;
                    }
                }
            }
            console.log(query);
            await db.query(query, (err, result) => {
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
            });
        } catch (err) {
            console.log(err);
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": process.env.INTERNALERROR_MESSAGE
            };
            resolve(message);
        }
    })
}

exports.partnerClass = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = "SELECT * FROM classschedule cs JOIN place p ON p.id = cs.placeId WHERE p.partnerId = ?";
            await db.query(query, [data.profile.id], (err, result) => {
                if (err) {
                    console.log("error get data", err);
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
                    }
                }
            });
        } catch (err) {
            console.log(err);
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": process.env.INTERNALERROR_MESSAGE
            };
            resolve(message);
        }
    })
}

exports.classList = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = '';
            if (data.param == 'all') {
                query = "SELECT * FROM classlist";
            }
            if (data.byClassId) {
                query = "SELECT c.name, c.id FROM classlist c WHERE c.id IN (" + data.byClassId + ") GROUP BY c.id";
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
            resolve(message);
        }
    })
}


exports.coachClassHistory = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            console.log(data);
            let query = "SELECT ca.*, cs.class as classId, cs.coach as coachId, u1.name as coachName, cs.startTime, cs.endTime, cs.startDate, cs.endDate, c.name as className from coachactivity ca JOIN classschedule cs ON cs.id = ca.scheduleId JOIN classlist c ON c.id = cs.class JOIN coach co ON co.id = cs.coach AND cs.coach = '" + data.profile.coachId + "' JOIN user u1 ON u1.id = co.userId WHERE u1.id = ? AND co.userid = ? AND action = 'finished'";
            await db.query(query, [data.profile.id, data.profile.id], (err, result) => {
                if (err) {
                    console.log("error get member class", err)
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
            resolve(message);
        }
    })
}

exports.memberClassHistory = function (data) {
    return new Promise(async function (resolve, reject) {
        let dataContent = '';
        try {
            if (data.request == "all") {
                query = "SELECT ma.*, cs.class as classId, cs.coach as coachId, u1.name as coachName, cs.startTime, cs.endTime, cs.startDate, cs.endDate, cs.placeId, p.name as placeName, c.name as className, u2.name as memberName from memberactivity ma JOIN classschedule cs ON cs.id = ma.scheduleId JOIN classlist c ON c.id = cs.class JOIN coach co ON co.id = cs.coach JOIN user u1 ON u1.id = co.userId JOIN member m ON m.id = ma.memberId JOIN user u2 On u2.id = m.userId JOIN place p ON p.id = cs.placeId";
                await db.query(query, (err, result) => {
                    if (err) {
                        console.log("error get member class", err)
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
                                "responseMessage": "You don't have any history class yet"
                            };
                            resolve(message);
                        }
                    }
                })
            } else if (data.request == "byPlace") {
                query = "SELECT ma.*, cs.class as classId, cs.coach as coachId, u1.name as coachName, cs.startTime, cs.endTime, cs.startDate, cs.endDate, cs.placeId, p.name as placeName, c.name as className, u2.name as memberName from memberactivity ma JOIN classschedule cs ON cs.id = ma.scheduleId JOIN classlist c ON c.id = cs.class JOIN coach co ON co.id = cs.coach JOIN user u1 ON u1.id = co.userId JOIN member m ON m.id = ma.memberId JOIN user u2 On u2.id = m.userId JOIN place p ON p.id = cs.placeId JOIN partner pr ON pr.id = p.partnerId WHERE pr.id = ? AND cs.placeId = ?";
                await db.query(query, [data.profile.partnerId, data.placeId], (err, result) => {
                    if (err) {
                        console.log("error get member class", err)
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
                                "responseMessage": "You don't have any history class yet"
                            };
                            resolve(message);
                        }
                    }
                })
            } else {
                let query = "SELECT ma.*, cs.class as classId, cs.coach as coachId, u1.name as coachName, cs.startTime, cs.endTime, cs.startDate, cs.endDate, c.name as className from memberactivity ma JOIN classschedule cs ON cs.id = ma.scheduleId JOIN classlist c ON c.id = cs.class JOIN coach co ON co.id = cs.coach JOIN user u1 ON u1.id = co.userId JOIN member m ON m.id = ma.memberId JOIN user u2 On u2.id = m.userId WHERE u2.id = ? AND m.userId = ? AND m.id = ?";
                await db.query(query, [data.profile.id, data.profile.id, data.profile.memberId], (err, result) => {
                    if (err) {
                        console.log("error get member class", err)
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
                                "responseMessage": "You don't have any history class yet"
                            };
                            resolve(message);
                        }
                    }
                })
            }
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

exports.memberClassBooked = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = "SELECT * FROM memberactivity ma JOIN classschedule cs ON cs.id = ma.scheduleId JOIN member m ON m.id = ma.memberId AND ma.memberId = '" + data.profile.memberId + "' WHERE m.userId = '" + data.profile.id + "'";
            await db.query(query, [data.profile.memberCat], (err, result) => {
                if (err) {
                    console.log("error get member class", err)
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
            console.log("error get class", err)
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": process.env.INTERNALERROR_MESSAGE
            };
            resolve(message);
        }
    })
}

exports.memberClass = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = "SELECT cs.class as classId, c.name as className, p.name as placeName, p.location, cs.coach as coachId, u1.name as coachName, cs.startTime, cs.endTime, cs.startDate, cs.endDate, cs.placeId, cm.membercat as memberCatId FROM classschedule cs JOIN classlist c ON c.id = cs.class JOIN classmember cm ON cm.classId = c.id JOIN coach co ON co.id = cs.coach JOIN user u1 ON u1.id = co.userId JOIN place p ON p.id = cs.placeId WHERE cm.membercat = ? GROUP BY c.id";
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
            let query = "SELECT *,u.name as coachName,cs.id as scheduleId, cl.name as className, ca.action FROM classlist cl INNER JOIN classschedule cs ON cs.class = cl.id INNER JOIN coach c ON c.id = cs.coach INNER JOIN user u ON u.id = c.userId LEFT JOIN coachactivity ca ON ca.scheduleId = cs.id  WHERE cl.id = " + data.classId + " GROUP BY cl.id";
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
            resolve(message);
        }
    })
}