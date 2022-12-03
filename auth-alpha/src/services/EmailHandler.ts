import nodemailer from "nodemailer";

class EmailHandler {

    static async sendEmail(clientEmail: string, subject: string, bodyPlaneText: string, bodyHTML: string) {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.HOST_EMAIL, // generated ethereal user
                pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
            }
        });

        // send mail with defined transport object
        await transporter.sendMail({
            from: `"Golden Aurora" <${process.env.HOST_EMAIL}>`, // sender address
            to: clientEmail, // list of receivers
            subject: subject, // Subject line
            text: bodyPlaneText, // plain text body
            html: bodyHTML, // html body
        }).catch((err) => {
            throw err;
        });
    };

};

export { EmailHandler };