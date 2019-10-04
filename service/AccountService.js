'use strict';
const nodeMail = require('nodemailer'),
smtpTransport = require('nodemailer-smtp-transport'); 

exports.sendSms = function sendSms(data) {
	return new Promise(async function (resolve, reject) {
		try{
			let transporter = nodeMail.createTransport(smtpTransport({
				service: 'gmail',
				host: 'smtp.gmail.com',
				port: 587,
				secure: false, // true for 465, false for other ports
				// ignoreTLS: true,
				auth: {
					user: 'networkfitclub@gmail.com', // generated ethereal user
					pass: 'buny2tampilbeda' // generated ethereal password
				},tls: {
					rejectUnauthorized: false
				}
			}));
			let info = await transporter.sendMail({
				from: '"Fit Club Membership 👻" <member@networkfitclub.com>', // sender address
				to: data.email, // list of receivers
				subject: 'Hello ✔', // Subject line
				text: 'Hello world?', // plain text body
				html: '<p>Wellcome, <b>'+data.name+'</b>.<br> this is your verification code '+data.verificationCode+'</p>' // html body
			});
			resolve(process.env.SUCCESS_RESPONSE);
		}catch(err){
			console.log("error send email", err);
			reject(process.env.ERRORINTERNAL_RESPONSE);
		}
	});
}



