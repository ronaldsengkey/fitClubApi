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
            let par = "";
            if (data.paymentVia == "cash") {
                par = {
                    "userId": parseInt(data.profile.id),
                    "nominal": data.nominal,
                    "memberCat": data.memberCat,
                    "status": "0", //status 0 = pending, 1 = sukses , -1 = gagal
                    "paymentVia": "cash" // cash / transfer
                }
            } else {
                par = {
                    "userId": parseInt(data.profile.id),
                    "nominal": data.nominal,
                    "memberCat": data.memberCat,
                    "status": "0", //status 0 = pending, 1 = sukses , -1 = gagal
                    "paymentVia": "transfer", // cash / transfer
                    "bankId": data.bankId
                }
            }
            const query = "INSERT INTO memberpayment SET ?";
            con.query(query, par, async function (err, result) {
                if (!err) {
                    if (result.affectedRows > 0) {
                        console.log('success payment');
                        let num = await generateNumber();
                        let total = parseInt(data.nominal) + num;
                        par.nominal = total;
                        par.transactionId = result.insertId;
                        message = {
                            "responseCode": process.env.SUCCESS_RESPONSE,
                            "responseMessage": process.env.SUCCESS_MESSAGE,
                            "data": par
                        }
                        resolve(message)
                    } else {
                        console.log('Something problem when payment member')
                        message = {
                            "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                            "responseMessage": process.env.ERRORSCHEDULE_MESSAGE,
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

exports.getBank = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            if (data.param == "all") {
                const query = "SELECT * FROM bank";
                con.query(query, (err, res) => {
                    if (!err) {
                        if (err) {
                            console.log('Error query get list bank => ', err)
                            message = {
                                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                                "responseMessage": "Error get list bank"
                            }
                            resolve(message);
                        } else {
                            if (res.length > 0) {
                                message = {
                                    "responseCode": process.env.SUCCESS_RESPONSE,
                                    "responseMessage": "List Bank",
                                    "data": res
                                };
                                resolve(message);
                            } else {
                                message = {
                                    "responseCode": process.env.NOTACCEPT_RESPONSE,
                                    "responseMessage": "Your list bank is not found"
                                }
                                resolve(message);
                            }
                        }
                    } else {
                        console.log("created schedule error", err);
                    }
                })
            } else {
                const query = "SELECT * FROM bank WHERE name = ?";
                con.query(query, [data.param], (err, res) => {
                    if (!err) {
                        if (err) {
                            console.log('Error query get list bank => ', err)
                            message = {
                                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                                "responseMessage": "Error get list bank"
                            }
                            resolve(message);
                        } else {
                            if (res.length > 0) {
                                message = {
                                    "responseCode": process.env.SUCCESS_RESPONSE,
                                    "responseMessage": "List Bank",
                                    "data": res
                                };
                                resolve(message);
                            } else {
                                message = {
                                    "responseCode": process.env.NOTACCEPT_RESPONSE,
                                    "responseMessage": "Your list bank is not found"
                                }
                                resolve(message);
                            }
                        }
                    } else {
                        console.log("created schedule error", err);
                    }
                })
            }
        } catch (err) {
            console.log("error create schedule", err);
            reject(err);
        }
    })
}

async function generateNumber() {
    // return Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
    return Math.random() * 100;
}