import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: "",
        pass: "Chb4gFGNmEmTK3aqgD",
    },
});

const mailOptions = {
    from: 'MOOV',
    to: "",
    subject: 'New client at moov',
    html: '<h1>There is a new client at moov</h1>'
}

try {
    const info = await transporter.sendMail(mailOptions)
    console.log(info)
} catch (err) {
    console.log(err)
}