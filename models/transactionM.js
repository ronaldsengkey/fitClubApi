const con = require('../config/dbConfig');
const member = require('../models/memberM');
const upload = require('../models/uploadM');
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
        if (data.memberId) {
            par.memberId = data.memberId
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
                    console.log(result.insertId)
                    par.oldMemberCat = data.oldMemberCat;
                    par.requestNumber = result.insertId;
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
        console.log('DATA TRANSACTION REQU EST => ', data)
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
            console.log('DATA GET BANK => ', data)
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
                const query = "SELECT * FROM bank WHERE LOWER(name) LIKE '%" + data.param + "%'";
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
                        console.log("Error query get list bank with param", err);
                    }
                })
            }
        } catch (err) {
            console.log("error get list bank", err);
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

// exports.uploadFiles = function (data) {
//     return new Promise(async function (resolve, reject) {
//         try {
//             let aw = await upload.uploadFiles(data);
//             // console.log('data upload files => ', data);
//             // let check = await checkUpload(data);
//             // if (check.responseCode == process.env.NOTFOUND_RESPONSE) {
//             //     let upload = await uploadToLocal(data);
//             //     console.log('result upload => ', upload)
//             //     if (upload.responseCode == process.env.SUCCESS_RESPONSE) {
//             //         let save = await saveFile(data);
//             //         resolve(save);
//             //     } else {
//             //         resolve(upload)
//             //     }
//             // } else {
//             //     resolve(check);
//             // }
//         } catch (error) {
//             console.log('Error uploading files => ', error)
//             message = {
//                 "responseCode": process.env.ERRORINTERNAL_RESPONSE,
//                 "responseMessage": process.env.INTERNALERROR_MESSAGE,
//             }
//             resolve(message)
//         }
//     })
// }

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
            param = {
                "file": data.file,
                "category": "payment",
                "transactionId": data.transactionId,
                "ownerId": data.profile.id
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

exports.confirmPaymentMember = function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            switch (data.concern) {
                case "upgrade":
                    let endDate = new Date();
                    let day = new Date(endDate.setDate(endDate.getDate() + 30));
                    let expDay = day.getDate();
                    let expMonth = day.getMonth() + 1;
                    let expYear = day.getFullYear();
                    let nowDay = new Date(endDate.setDate(endDate.getDate()));
                    let nowExpDay = nowDay.getDate();
                    let nowExpMonth = nowDay.getMonth() + 1;
                    let nowExpYear = nowDay.getFullYear();
                    let convertDate = expYear + '-' + expMonth + '-' + expDay;
                    let nowConvertDate = nowExpYear + '-' + nowExpMonth + '-' + nowExpDay;
                    if (data.memberId) {
                        let checkTrans = "SELECT * FROM temppayment WHERE id = ? AND userId = ? AND requestCategory = ?";
                        con.query(checkTrans, [data.transactionId, data.profile.id, data.concern], (err, res) => {
                            if (!err) {
                                if (res.affectedRows > 0) {
                                    let upTrans = "UPDATE temppayment SET status = ? WHERE id = ?";
                                    con.query(upTrans, ['1', data.transactionId], (err, result) => {
                                        if (!err) {
                                            if (result.affectedRows > 0) {
                                                let p = {
                                                    "userId": res[0].userId,
                                                    "nominal": res[0].nominal,
                                                    "memberCat": res[0].memberCat,
                                                    "createdAt": nowConvertDate,
                                                    "paymentVia": res[0].paymentVia
                                                };
                                                if (res[0].paymentVia == "transfer") {
                                                    p.bankId = res[0].bankId
                                                }
                                                let insertPayment = "INSERT INTO memberpayment SET ?";
                                                con.query(insertPayment, p, (err, ip) => {
                                                    if (!err) {
                                                        if (ip.affectedRows > 0) {
                                                            let updateMember = "UPDATE member SET status = ?, memberCat = ?, endDate = ? WHERE id = ? AND userId = ?";
                                                            con.query(updateMember, [1, res[0].memberCat, convertDate, data.memberId, res[0].userId], (err, um) => {
                                                                if (!err) {
                                                                    if (um.affectedRows > 0) {
                                                                        console.log('Transaction success confirmation');
                                                                        message = {
                                                                            "responseCode": process.env.SUCCESS_RESPONSE,
                                                                            "responseMessage": "Transaction success confirm",
                                                                        }
                                                                        resolve(message)
                                                                    } else {
                                                                        console.log('failed confirm transaction');
                                                                        message = {
                                                                            "responseCode": process.env.NOTACCEPT_RESPONSE,
                                                                            "responseMessage": "Transaction failed confirm",
                                                                        }
                                                                        resolve(message)
                                                                    }
                                                                } else {
                                                                    console.log('Error query update member');
                                                                    message = {
                                                                        "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                                                                        "responseMessage": process.env.INTERNALERROR_MESSAGE,
                                                                    }
                                                                    resolve(message)
                                                                }
                                                            })
                                                        } else {
                                                            console.log('Failed insert into member payment');
                                                            message = {
                                                                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                                                                "responseMessage": process.env.INTERNALERROR_MESSAGE,
                                                            }
                                                            resolve(message)
                                                        }
                                                    } else {
                                                        console.log('Error query insert into member payment');
                                                        message = {
                                                            "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                                                            "responseMessage": process.env.INTERNALERROR_MESSAGE,
                                                        }
                                                        resolve(message)
                                                    }
                                                })
                                            } else {
                                                console.log('Failed query update temporary payment');
                                                message = {
                                                    "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                                                    "responseMessage": process.env.INTERNALERROR_MESSAGE,
                                                }
                                                resolve(message)
                                            }
                                        } else {
                                            console.log('Error query update temporary payment');
                                            message = {
                                                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                                                "responseMessage": process.env.INTERNALERROR_MESSAGE,
                                            }
                                            resolve(message)
                                        }
                                    })
                                } else {
                                    console.log('transaction is not exist')
                                    message = {
                                        "responseCode": process.env.NOTFOUND_RESPONSE,
                                        "responseMessage": "Your transaction is not exist!",
                                    }
                                    resolve(message)
                                }
                            } else {
                                console.log('Something error on query check transaction')
                                message = {
                                    "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                                    "responseMessage": process.env.INTERNALERROR_MESSAGE,
                                }
                                resolve(message)
                            }
                        })
                    } else {
                        console.log('Member Id is required')
                        message = {
                            "responseCode": process.env.NOTACCEPT_RESPONSE,
                            "responseMessage": "Data member ID is required",
                        }
                        resolve(message)
                    }
                    break;
                case "rejoin":
                    const updateMember = "UPDATE member SET joinDate = ?, endDate = ?"
                    break;
                case "join":
                    if (data.memberCat) {
                        let param = {
                            "profile": data.profile,
                            "memberCat": data.memberCat
                        }
                        let memb = await member.joinMember(param);
                        resolve(memb);
                    } else {
                        message = {
                            "responseCode": process.env.NOTACCEPT_RESPONSE,
                            "responseMessage": "Member category is required",
                        }
                        resolve(message)
                    }
                    break;
            }
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