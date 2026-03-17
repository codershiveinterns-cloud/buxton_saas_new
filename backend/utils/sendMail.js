const nodemailer = require('nodemailer');

let transporter;

const isMailConfigured = () => Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);

const getTransporter = () => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });
    }

    return transporter;
};

const sendMail = async ({ to, subject, html, text }) => {
    const recipients = Array.isArray(to) ? to.filter(Boolean) : [to].filter(Boolean);

    if (recipients.length === 0) {
        return { sent: false, skipped: true, reason: 'No recipients supplied' };
    }

    if (!isMailConfigured()) {
        console.warn('[Mail] Gmail credentials are not configured. Skipping email send.');
        return { sent: false, skipped: true, reason: 'Mail transport is not configured' };
    }

    await getTransporter().sendMail({
        from: process.env.MAIL_FROM || process.env.GMAIL_USER,
        to: recipients.join(','),
        subject,
        text,
        html
    });

    return { sent: true };
};

module.exports = {
    sendMail,
    isMailConfigured
};
