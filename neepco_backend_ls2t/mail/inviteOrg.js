import { createTransport } from 'nodemailer';
import fs from 'fs';
import adminInviteTempalte from './adminInviteTemplate.js';

const sender = createTransport({
    host: 'smtp.gmail.com',
    port:587,
    secure:false,
    auth: {
        user: 'noreply.neepco.ltd@gmail.com',
        pass: 'vzhdnqcrmwpbswgj',
    },
});

const officialCreated = async(userEmail, password) => {
    /*
    var mailOptions = {
        from: {
            name: "NEEPCO Ltd. Procurement and Payment System",
            address: 'noreply.neepco.ltd@gmail.com'
        },
        to: userEmail,
        subject: 'Invited to NEEPCO Procurement and Payment System',
        html: adminInviteTempalte(userEmail, password)
    }

    let resp = sender.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('officialCreated Email sent: ' + userEmail);
        }
    }); */

    try{
        let info = await sender.sendMail({
            from: {
                name: "NEEPCO Ltd. Procurement and Payment System",
                address: 'noreply.neepco.ltd@gmail.com'
            },
            to: userEmail,
            subject: 'Invited to NEEPCO Procurement and Payment System',
            html: adminInviteTempalte(userEmail, password)
        });
        console.log('Official Created Email sent');
        console.log(info.response);
        return info;
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

export default officialCreated;




