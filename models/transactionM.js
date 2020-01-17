const con = require('../config/dbConfig');
let query = '',
    message = '';

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
                    console.log("created schedule error", err);
                }
            })
        } catch (err) {
            console.log("error create schedule", err);
            reject(err);
        }
    })
}