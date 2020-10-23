'use strict';
const nodeMail = require('nodemailer'),
smtpTransport = require('nodemailer-smtp-transport'); 

exports.sendSms = function sendSms(data) {
	return new Promise(async function (resolve, reject) {
		try{
			console.log("called pak eko", data)
			let transporter = nodeMail.createTransport(smtpTransport({
				service: 'gmail',
				// host: 'srv63.niagahoster.com',
				host: 'smtp.gmail.com',
				port: 465,
				secure: true, // true for 465, false for other ports
				// ignoreTLS: true,
				auth: {
					user: 'networkfitclub@gmail.com', //networkfitclub@gmail.com / welcome@fitclubtech.com generated ethereal user
					pass: 'buny2tampilbeda' //buny2tampilbeda / Buny2tampilbeda! generated ethereal password
				}
				// ,tls: {
				// 	rejectUnauthorized: false
				// }
			}));
			let info = await transporter.sendMail({
				from: '"Fit Club Membership 👻" <networkfitclub@gmail.com>', // sender address
				to: data.email, // list of receivers
				subject: 'Hello ✔', // Subject line
				text: 'Hello'+data.name, // plain text body
				html: '<p>Wellcome, <b>'+data.name+'</b>.<br> this is your verification code '+data.verificationCode+'<br>For more information please call +62 858 5422 3422</p>' // html body
			});
			resolve(process.env.SUCCESS_RESPONSE);
		}catch(err){
			console.log("error send email", err);
			reject(process.env.ERRORINTERNAL_RESPONSE);
		}
	});
}



