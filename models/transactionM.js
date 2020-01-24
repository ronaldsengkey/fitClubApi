const con = require('../config/dbConfig');
let query = '',
    message = '';

async function generateOtp() {
    return Math.floor(10 + Math.random() * 90);
}

exports.transactionRequest = function (data) {
    return new Promise(async function (resolve, reject) {
        console.log(data);
        let query = "SELECT * FROM `memberfee` WHERE membercat = ? AND placeId = ?";
        let a = await generateOtp();
        let memberCat =JSON.parse(data.param);
        await con.query(query,[memberCat.memberCategory, memberCat.placeId], (err, result) => {
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
                        "data":{"price":result[0].fee+a}
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
    })
}

exports.memberPayment = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            const query = "INSERT INTO memberPayment SET ?";
            con.query(query, {
                "memberId": parseInt(data.profile.memberId),
                "scheduleId": data.scheduleId,
                "action": data.actiion
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
                    console.log("payent failed", err);
                }
            })
        } catch (err) {
            console.log("error payment", err);
            reject(err);
        }
    })
}