require('dotenv').config();
const express = require("express")
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

const code = Math.floor(
    Math.random() * (700000 - 100000) + 100000
)

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// Step 2
function getMailOptions() {
    return {
        from: '2018cs61@student.uet.edu.pk',
        // to: 'abc@gmail.com',
        subject: 'Verification Code',
        text: "Your code is " + code
    }
}

// Step 3
function sendMail(email, res) {
    const mailOpts = getMailOptions();

    return transporter.sendMail({ ...mailOpts, to: email }, (err, data) => {
        if (err) {
            res.status(500).json("Server Error" + err)
        }
        else {
            res.status(200).json("Verification Code Sent")
        }

    });
}



module.exports = { sendMail, code }