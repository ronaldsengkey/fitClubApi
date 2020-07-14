const con = require('../config/dbConfig');
const member = require('../models/memberM');
let query = '',
    message = {};
var fs = require('fs');

exports.uploadFiles = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            switch (data.concern) {
                case "profile":
                    console.log('data upload files => ', data);
                    let ch = await checkUpload(data);
                    if (ch.responseCode == process.env.NOTFOUND_RESPONSE) {
                        let up = await uploadToLocal(data);
                        console.log('result upload => ', upload)
                        if (up.responseCode == process.env.SUCCESS_RESPONSE) {
                            let sav = await saveFile(data);
                            resolve(sav);
                        } else {
                            resolve(upload)
                        }
                    } else {
                        resolve(check);
                    }
                    break;
                    break;
                case "payment":
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
                    break;
                default:
                    message = {
                        "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                        "responseMessage": "Your API is invalid!",
                    }
                    resolve(message)
                    break;
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

function checkUpload(data) {
    return new Promise(async function (resolve, reject) {
        let res = {};
        try {
            if (data.concern == "payment") {
                let query = "SELECT * FROM file WHERE transactionId = ? AND ownerId = ? AND category = 'payment'";
                con.query(query, [data.transactionId, data.profile.id], (err, res) => {
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
            } else if (data.concern == "profile") {
                let query = "SELECT * FROM file WHERE ownerId = ? WHERE category = 'profile'";
                con.query(query, [data.profile.id], (err, res) => {
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
            } else {

            }
        } catch (e) {
            console.log('Error checking upload data files => ', e);
            res.responseCode = process.env.ERRORINTERNAL_RESPONSE;
            res.responseMessage = "Internal server error";
            resolve(res);
        }
    })
}

function uploadToLocal(data) {
    return new Promise(async function (resolve, reject) {
        try {
            let base64Image = data.file.split(';base64,').pop();
            let name = new Buffer.from(data.transactionId + ":" + new Date().toISOString()).toString('base64');
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
            if (data.concern == "profile") {
                param = {
                    "file": data.file,
                    "category": "profile",
                    "ownerId": data.profile.id
                }
            } else if (data.concern == "payment") {
                param = {
                    "file": data.file,
                    "category": "payment",
                    "transactionId": data.transactionId,
                    "ownerId": data.profile.id
                }
            } else {
                console.log('Wrong input concern data for saving file');
                res.responseCode = process.env.NOTACCEPT_RESPONSE;
                res.responseMessage = "Something problem in server!";
                reject(res);
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