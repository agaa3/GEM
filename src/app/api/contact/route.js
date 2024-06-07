import nodemailer from 'nodemailer';

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const { name, email, subject, message } = req.body;

        // Create a transporter object using SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Replace with your email provider's SMTP server
            port: 587, // Replace with the port
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'aniakruk776@gmail.com', // Replace with your email
                pass: 'ebizneskonto123', // Replace with your email password
            },
        });

        // Setup email data
        let mailOptions = {
            from: `"${name}" <${email}>`, // sender address
            to: 'aniakruk776@gmail.com', // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
        };

        try {
            // Send email

            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Error sending email' });
        }
    } else {
        console.log("poza post");
        // res.status(405).json({ message: 'Method not allowed' });
    }
}
