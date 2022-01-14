const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", 
    secureConnection: false, 
    port: 587, 
    tls: {
        ciphers: "SSLv3",
    },
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

let sendWelcomeMail = async (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let mailOptions = {
                from: "Invest With Tribe <divyanshu.singh20013@outlook.com>",
                to: user.email,
                subject: "Hi, welcome to invest with tribe",
                text: "Hello, we welcome you to invest with tribe. Thanks for signing up on our site.",
            };

            const info = await transporter.sendMail(mailOptions);
            console.log(info);
            resolve(info)
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

module.exports = {sendWelcomeMail};
