var message = '';
const db = require('../config/dbConfig');
const sha1 = require('sha1');
const crypto = require('crypto');
const pswdHashing = require('argon2');
let query = '';
var jwt = require('jsonwebtoken');
require('dotenv').config();
let sm = require('../service/AccountService');
const fs = require('fs');


function getUserByMail(param) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = "SELECT u.*, m.id as memberId, p.id as partnerId, c.id as coachId, m.code, m.memberCat, m.joinDate, m.endDate FROM user u LEFT JOIN member m ON m.userId = u.id LEFT JOIN partner p ON p.userId = u.id LEFT JOIN coach c ON u.id = c.userId WHERE u.email = ?";
            db.query(query, [param.email], async function (err, res) {
                try {
                    if (err) {
                        console.log('Error query get user by mail => ', err)
                        message = {
                            "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                            "responseMessage": "Error login"
                        }
                        resolve(message);
                    } else {
                        if (res.length > 0) {
                            message = {
                                "responseCode": process.env.SUCCESS_RESPONSE,
                                "data": res[0]
                            };
                            resolve(message);
                        } else {
                            message = {
                                "responseCode": process.env.NOTACCEPT_RESPONSE,
                                "responseMessage": "Your email doesn't match"
                            }
                            resolve(message);
                        }
                    }
                } catch (err) {
                    console.log("error query user", err);
                }
            });
        } catch (err) {
            console.log("error get user", err)
        }
    })
}

// async function createToken(data){
//     console.log("called create token");
// try{
//     const token = jwt.sign({profile:data,scoope:["user"],role:["customer"]}, process.env.KREDENTIAL_KEY, {
//         expiresIn: 86400 // expires in 24 hours
//     });
//     return token;
// }catch(err){
//     console.log("err create token ", err);
//     return err;
// }
// }

exports.confirmation = function confirmation(data) {
    return new Promise(async function (resolve, reject) {
        try {
            let query = `UPDATE user
           SET accountStatus = ?
           WHERE verificationCode = ? AND email = ? AND phone = ?`;
            db.query(query, [1, data.otpCode, data.email, data.phone], async function (err, res) {
                if (err) {
                    reject(process.env.ERRORINTERNAL_RESPONSE);
                } else {
                    resolve(process.env.SUCCESS_RESPONSE);
                }
            })
        } catch (err) {
            console.log("check error =>", err)
            reject(process.env.ERRORINTERNAL_RESPONSE);
        }
    })
}

async function updateToken(param) {
    try {
        let query = `UPDATE user
        SET accessToken = ?
        WHERE id = ? AND email = ? AND phone = ?`;
        db.query(query, [param.token, param.id, param.email, param.phone], async function (err, res) {
            if (err) {
                console.log(err)
                return process.env.ERRORINTERNAL_RESPONSE;
            } else {
                return process.env.SUCCESS_RESPONSE;
            }
        });
    } catch (err) {
        console.log(err);
        return process.env.ERRORINTERNAL_RESPONSE;
    }
}

exports.loginAccess = function loginAccess(data) {
    return new Promise(async function (resolve, reject) {
        try {
            let ev = await getUserByMail(data);
            if (ev.responseCode == process.env.SUCCESS_RESPONSE) {
                let c = await pswdHashing.verify(ev.data.password, data.password);
                if (c) {
                    if (ev.data.memberId == null) {
                        ev.data.memberId == 0;
                    }
                    if (ev.data.partnerId == null) {
                        ev.data.partnerId == 0;
                    }
                    let param = {
                        id: ev.data.id,
                        name: ev.data.name,
                        gender: ev.data.gender,
                        memberCat: ev.data.memberCat,
                        memberId: ev.data.memberId,
                        partnerId: ev.data.partnerId,
                        coachId: ev.data.coachId,
                        memberCode: ev.data.memberCode,
                        joinMemberDate: ev.data.joinDate,
                        endMemberDate: ev.data.endDate,
                        phone: ev.data.phone,
                        address: ev.data.address,
                        email: ev.data.email
                    }
                    let d = await generateToken(param);
                    param.token = d;
                    let e = await updateToken(param);
                    switch (e) {
                        case process.env.ERRORINTERNAL_RESPONSE:
                            message = {
                                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                                "responseMessage": "Token gerenated failed"
                            }
                            resolve(message);
                            break;
                        default:
                            console.log('Success login')
                            message = {
                                "responseCode": process.env.SUCCESS_RESPONSE,
                                "responseMessage": "Login success",
                                "data": ev.data
                            }
                            resolve(message);
                    }
                } else {
                    message = {
                        "responseCode": process.env.NOTACCEPT_RESPONSE,
                        "responseMessage": "Password dosen't match"
                    }
                    resolve(message)
                }
            }
        } catch (err) {
            console.log(err);
            message = {
                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                "responseMessage": "Login failed please try again"
            }
            reject(message);
        }
    })
}

async function addPartner(data) {
    try {
        query = 'insert into partner set ? ';
        const na = {
            userId: data,
            status: 1
        };
        const ac = await db.query(query, na);
        console.log('result add coach => ', ac)
        if (ac) {
            console.log("check coach =>", ac);
            return (process.env.SUCCESS_RESPONSE);
        }
    } catch (err) {
        console.log("error add coach =>", err);
        return (process.env.ERRORINTERNAL_RESPONSE);
    }
}

function addCoach(data) {
    return new Promise(async function (resolve, reject) {
        try {
        let na = {
            userId: data.userId,
            placeId: data.placeId,
            specialization:data.specialization.join(),
            status: 0
        };
        query = 'insert into coach set ? ';
        let ac = await db.query(query, na, async function (err, res) {
            if (err) {
                console.log("error insert user data", err);
                message = {
                    "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                    "responseMessage": err.sqlMessage
                }
                resolve(message);
            } else {
                if (res.affectedRows > 0) {
                    resolve(process.env.SUCCESS_RESPONSE);
                }
            }
        });
        
        // console.log('result add coach => ', ac)
        // if (ac) {
        //     console.log("check coach =>", ac);
        //     return (process.env.SUCCESS_RESPONSE);
        // }
    } catch (err) {
        console.log("error add coach =>", err);
        return (process.env.ERRORINTERNAL_RESPONSE);
    }
})
}

async function generateToken(data) {
    try {
        // PAYLOAD
        let payload = data;

        // PRIVATE and PUBLIC key
        let privateKEY = fs.readFileSync('./private.key', 'utf8');
        let publicKEY = fs.readFileSync('./public.key', 'utf8');
        let i = 'FitClub Network'; // Issuer 
        let s = 'agnetiuslee@gmail.com'; // Subject 
        let a = 'http://fitclub.id'; // Audience

        // SIGNING OPTIONS
        let signOptions = {
            issuer: i,
            subject: s,
            audience: a,
            expiresIn: "5h",
            algorithm: "RS256"
        };
        let token = jwt.sign(payload, privateKEY, signOptions);
        return token;
    } catch (err) {
        console.log("error generate token", err);
    }
}

async function generateCode() {
    try {
        return Math.floor(100000 + Math.random() * 900000);
    } catch (err) {
        console.log("error generate code", err);
    }
}

exports.addAccount = function addAccount(data) {
    return new Promise(async function (resolve, reject) {
        try {
            let ev = await getUserByMail(data);
            if (ev.responseCode == process.env.SUCCESS_RESPONSE) {
                message = {
                    "responseCode": process.env.NOTACCEPT_RESPONSE,
                    "responseMessage": "Oops email already exist"
                }
                resolve(message);
            } else {
                const pswd = await pswdHashing.hash(data.password);
                // const pswd = sha1(data.password);                
                let code = await generateCode();
                data.verificationCode = code;
                data.password = pswd;
                let token = await generateToken(data);
                let newAccount = {
                    name: data.name,
                    gender: data.gender,
                    phone: data.phone,
                    address: data.address,
                    imgProfile: 'none',
                    email: data.email,
                    password: pswd,
                    verificationCode: code,
                    accessToken: token,
                    onlineStatus: "online",
                    accountStatus: 0
                };
                query = 'insert into user set ? ';
                await db.query(query, newAccount, async function (err, res) {
                    if (err) {
                        console.log("error insert user data", err);
                        message = {
                            "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                            "responseMessage": err.sqlMessage
                        }
                        resolve(message);
                    } else {
                        if (res.affectedRows > 0) {
                            if (data.filter == 'coach') {
                                let param = {userId:res.insertId,placeId:data.placeId,specialization:data.specialization};
                                const ac = await addCoach(param);
                                console.log("===============>", ac)
                                if (ac == process.env.SUCCESS_RESPONSE) {
                                    message = {
                                        "responseCode": process.env.SUCCESS_RESPONSE,
                                        "responseMessage": "Registration Success Please Verify Your Email Adress",
                                        data: {
                                            phone: newAccount.phone,
                                            email: newAccount.email
                                        }
                                    }
                                    resolve(message);
                                }
                            }else if(data.filter == 'partner'){
                                const ac = await addPartner(res.insertId);
                                if (ac == process.env.SUCCESS_RESPONSE) {
                                    message = {
                                        "responseCode": process.env.SUCCESS_RESPONSE,
                                        "responseMessage": "Registration Success Please Verify Your Email Adress",
                                        data: {
                                            phone: newAccount.phone,
                                            email: newAccount.email
                                        }
                                    }
                                    resolve(message);
                                }
                            } else {
                                let a = await sm.sendSms(data);
                                switch (a) {
                                    case process.env.ERRORINTERNAL_RESPONSE:
                                        console.log('error send email', err);
                                        break;
                                    default:
                                        console.log('send email success', a);
                                        message = {
                                            "responseCode": process.env.SUCCESS_RESPONSE,
                                            "responseMessage": "Registration Success Please Verify Your Email Adress"
                                        }
                                        resolve(message);
                                        break;
                                }
                            }
                        } else {
                            console.log("failed add account");
                            message = {
                                "responseCode": process.env.ERRORINTERNAL_RESPONSE,
                                "responseMessage": process.env.INTERNALERROR_MESSAGE
                            }
                            resolve(message);
                        }
                    }
                });
            }
        } catch (err) {
            reject(err);
            console.log(err);
        }
    })
}