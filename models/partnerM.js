const con = require('../config/dbConfig');
let query = '',
    message = '';

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
}

exports.addPlace = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            console.log('data join member => ', data)
            const qp = "INSERT INTO place SET ?";
            let newData = {
                "name": data.placeName,
                "location": data.address,
                "owner": parseInt(data.profile.id)
            };
            con.query(qp,newData, (err, result) => {
                if (!err) {
                    if (result.affectedRows > 0) {
                        console.log('result => ', result.insertId)
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
                    console.log("created schedule error", err);
                    message = {
                        "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                        "responseMessage": process.env.ERRORSCHEDULE_MESSAGE
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