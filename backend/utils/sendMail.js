const nodemailer = require('nodemailer');

let transporter;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getMailCredentials = () => ({
    user: process.env.EMAIL_USER || process.env.GMAIL_USER,
    pass: process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD
});

const normalizeRecipients = (to) => {
    const rawRecipients = Array.isArray(to)
        ? to
        : typeof to === 'string'
            ? to.split(',')
            : [];

    const recipients = [...new Set(rawRecipients.map((email) => email?.trim().toLowerCase()).filter(Boolean))];
    const invalidRecipients = recipients.filter((email) => !EMAIL_REGEX.test(email));

    if (invalidRecipients.length > 0) {
        throw new Error(`Invalid email recipient(s): ${invalidRecipients.join(', ')}`);
    }

    return recipients;
};

const isMailConfigured = () => {
    const credentials = getMailCredentials();
    return Boolean(credentials.user && credentials.pass);
};

const getTransporter = () => {
    if (!transporter) {
        const credentials = getMailCredentials();

        if (!credentials.user || !credentials.pass) {
            throw new Error('EMAIL_USER and EMAIL_PASS must be configured for Gmail SMTP');
        }

        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: credentials.user,
                pass: credentials.pass
            }
        });
    }

    return transporter;
};

const sendMail = async ({ to, subject, html, text }) => {
    const recipients = normalizeRecipients(to);

    if (recipients.length === 0) {
        throw new Error('No email recipients supplied');
    }

    if (!isMailConfigured()) {
        throw new Error('EMAIL_USER and EMAIL_PASS are not configured');
    }

    try {
        const credentials = getMailCredentials();
        const info = await getTransporter().sendMail({
            from: process.env.MAIL_FROM || credentials.user,
            to: recipients.join(','),
            subject,
            text,
            html
        });

        return { sent: true, messageId: info.messageId };
    } catch (error) {
        console.error('[Mail] Failed to send email:', error);
        throw error;
    }
};

module.exports = {
    sendMail,
    isMailConfigured
};
