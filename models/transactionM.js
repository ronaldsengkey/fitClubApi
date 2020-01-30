const con = require('../config/dbConfig');
let query = '',
    message = {};
var fs = require('fs');

async function generateNumber() {
    return Math.floor(10 + Math.random() * 90);
}

function tempTransaction(data) {
    return new Promise(async function (resolve, reject) {
        let par = {
            "userId": parseInt(data.userId),
            "nominal": data.price,
            "memberCat": data.memberCat,
            "placeId": data.placeId,
            "status": "0", //status 0 = pending, 1 = sukses , -1 = gagal
            "paymentVia": data.paymentType, // cash / transfer
            "requestCategory": data.requestCat
        }
        if (data.bankId) {
            par.bankId = data.bankId;
        }
        const query = "INSERT INTO temppayment SET ?";
        con.query(query, par, async function (err, result) {
            if (err) {
                message = {
                    "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                    "responseMessage": process.env.INTERNALERROR_MESSAGE
                };
                resolve(message);
            } else {
                if (result.affectedRows > 0) {
                    par.oldMemberCat = data.oldMemberCat;
                    message = {
                        "responseCode": process.env.SUCCESS_RESPONSE,
                        "responseMessage": process.env.SUCCESS_MESSAGE,
                        "data": par
                    }
                    resolve(message);
                } else {
                    message = {
                        "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                        "responseMessage": process.env.INTERNALERROR_MESSAGE
                    };
                    resolve(message);
                }
            }
        })
    });
}
exports.transactionRequest = function (data) {
    return new Promise(async function (resolve, reject) {
        let query = "SELECT * FROM `memberfee` WHERE membercat = ? AND placeId = ?";
        let a = await generateNumber();
        let memberCat = JSON.parse(data.param);
        await con.query(query, [memberCat.memberCategory, memberCat.placeId], async function (err, result) {
            if (err) {
                console.log("error get data", err)
                message = {
                    "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                    "responseMessage": process.env.INTERNALERROR_MESSAGE
                };
                resolve(message);
            } else {
                if (result.length > 0) {
                    let content = {
                        "memberCat": memberCat.memberCategory,
                        "price": parseInt(result[0].fee + a),
                        "placeId": memberCat.placeId,
                        "userId": data.profile.id,
                        "bankId": memberCat.bankId,
                        "paymentType": memberCat.paymentType,
                        "requestCat": memberCat.requestCat
                    };
                    if (memberCat.oldMemberCat) {
                        content.oldMemberCat = memberCat.oldMemberCat;
                    }
                    let t = await tempTransaction(content);
                    resolve(t);
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
                const query = "SELECT * FROM bank WHERE name = LIKE '%?%'";
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

function checkUpload(data) {
    return new Promise(async function (resolve, reject) {
        let res = {};
        try {
            let query = "SELECT * FROM file WHERE transactionId = ?";
            con.query(query, [data.transactionId], (err, res) => {
                if (err) {
                    console.log('Error query check upload data => ', err)
                    message = {
                        "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                        "responseMessage": "Internal server error"
                    }
                    resolve(message);
                } else {
                    if (res.length > 0) {
                        message = {
                            "responseCode": process.env.NOTACCEPT_RESPONSE,
                            "responseMessage": "You have uploaded"
                        };
                        resolve(message);
                    } else {
                        message = {
                            "responseCode": process.env.NOTFOUND_RESPONSE,
                            "responseMessage": "No data uploaded"
                        }
                        resolve(message);
                    }
                }
            })
        } catch (e) {
            console.log('Error checking upload data files => ', e);
            res.responseCode = process.env.ERRORINTERNAL_RESPONSE;
            res.responseMessage = "Internal server error";
            resolve(res);
        }
    })
}

exports.uploadFiles = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            console.log('data upload files => ', data);
            let check = await checkUpload(data);
            if (check.responseCode == process.env.NOTFOUND_RESPONSE) {
                let upload = await uploadToLocal(data);
                console.log('result upload => ', upload)
                if (upload.responseCode == process.env.SUCCESS_RESPONSE) {
                    let save = await saveFile(data);
                    resolve(save);
                } else {
                    resolve(upload)
                }
            } else {
                resolve(check);
            }
        } catch (error) {
            console.log('Error uploading files => ', error)
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": process.env.INTERNALERROR_MESSAGE,
            }
            resolve(message)
        }
    })
}

function uploadToLocal(data) {
    return new Promise(async function (resolve, reject) {
        try {
            let base64Image = data.file.split(';base64,').pop();
            let name = new Buffer.from(data.id + ":" + new Date().toISOString()).toString('base64');
            const type = data.file.split(';')[0].split('/')[1];
            let path = `uploads/${name}.` + type;
            fs.writeFile(path, base64Image, {
                encoding: 'base64'
            }, function (err) {
                if (err) {
                    console.log('file failed upload ', err);
                    message = {
                        "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                        "responseMessage": process.env.INTERNALERROR_MESSAGE,
                    }
                } else {
                    message = {
                        "responseCode": process.env.SUCCESS_RESPONSE,
                        "responseMessage": process.env.SUCCESS_MESSAGE,
                        "data": path
                    }
                }
                resolve(message);
            });
        } catch (error) {
            console.log('Error upload file => ', error)
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": process.env.INTERNALERROR_MESSAGE,
            }
            resolve(message)
        }
    })
}

function saveFile(data) {
    return new Promise(async function (resolve, reject) {
        let res = {};
        try {
            console.log('IN ', data)
            query = "INSERT INTO file SET ?";
            param = {
                "file": data.file,
                "category": "payment",
                "transactionId": data.transactionId
            }
            con.query(query, param, (err, result) => {
                console.log('result => ', result)
                if (!err) {
                    if (result.affectedRows > 0) {
                        res.responseCode = process.env.SUCCESS_RESPONSE;
                        res.responseMessage = "Success upload file";
                    } else {
                        res.responseCode = process.env.ERRORINTERNAL_RESPONSE;
                        res.responseMessage = "Failed upload file";
                    }
                    console.log('res => ', res)
                    resolve(res);
                } else {
                    console.log('Something error when save file => ', err)
                    res.responseCode = process.env.ERRORINTERNAL_RESPONSE;
                    res.responseMessage = "Failed upload file";
                    resolve(res);
                }
            })
        } catch (err) {
            console.log('Something internal server error => ', err)
            res.responseCode = process.env.ERRORINTERNAL_RESPONSE;
            res.responseMessage = "Internal Server Error!";
            resolve(res);
        }
    })
}

exports.listTransactionRequest = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = "SELECT * FROM temppayment";
            con.query(query, (err, res) => {
                if (err) {
                    console.log('Error query get list transaction request => ', err)
                    message = {
                        "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                        "responseMessage": "Internal server error"
                    }
                    resolve(message);
                } else {
                    if (res.length > 0) {
                        message = {
                            "responseCode": process.env.SUCCESS_MESSAGE,
                            "responseMessage": "List data transaction request",
                            "data": res
                        };
                        resolve(message);
                    } else {
                        message = {
                            "responseCode": process.env.NOTFOUND_RESPONSE,
                            "responseMessage": "No data found"
                        }
                        resolve(message);
                    }
                }
            })
        } catch (error) {
            console.log('Error get list transaction request => ', error)
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": process.env.INTERNALERROR_MESSAGE,
            }
            resolve(message)
        }
    })
}