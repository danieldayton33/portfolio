import RouteHandler from '@/utils/route-handler';

export default RouteHandler({
    POST: async (request, response) => {
        const { name, email, message } = request.body;
        if (!name || !email || !message) {
            return response.status(400).send('Missing required fields');
        }
        const nodemailer = require('nodemailer');
        const { createTransport } = nodemailer;
        const transporter = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER_NAME,
                pass: process.env.GMAIL_PASSWORD,
            },
        });
        const data = {
            from: process.env.GMAIL_USER_NAME,
            to: process.env.GMAIL_USER_NAME,
            subject: `Message from ${name}`,
            text: `Received message from ${name} (${email}):\n\n${message}`,
        };
        let error = null;
        // @ts-ignore
        transporter.sendMail(data, function (error, info) {
            if (error) {
                console.log(error);
                error = error;
            } else {
                console.log('Email sent: ' + info.response);
                info = info;
            }
        });
        if (error) {
            return response.status(500).send('Server error');
        }
        return response.status(200).send('Success');
    },
});
