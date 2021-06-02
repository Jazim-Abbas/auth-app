const models = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const env = require("dotenv").config()
const { sendMail, code } = require("../middlewares/sendEmail")

const login = (req, res) => {
    const body = req.body

    models.HealthOfficial.findOne({ where: { email: body.email } })


        .then(

            result => {
                if (result === null) {
                    res.status(500).json({
                        message: "Invalid Credentials"
                    })
                }
                else {
                    const matchedPassword = bcrypt.compareSync(body.password, result.password);
                    if (matchedPassword) {
                        const token = jwt.sign({
                            name: result.name,
                            email: result.email,
                            userID: result.id
                        }, process.env.ACCESS_TOKEN_SECRET)
                        res.json({
                            message: "Auth Successfull.",
                            token: token,
                            name: result.name,
                            email: result.email,
                            userID: result.id
                        })
                    }
                    else {
                        res.status(500).json({
                            message: "Invalid Credentials"
                        })
                    }
                }
            })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong " + error,
                newUser: error
            })
        })

}

const show = (req, res) => {
    models.HealthOfficial.findOne({ where: { email: req.body.email } })
        .then(result => {
            if (result) {
                res.status(200).json({
                    name: result.name,
                    email: result.email,
                    familyName: result.familyName,
                    phone: result.phone
                })
            }
            else {
                res.status(404).json({
                    message: "Not Found"
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong"
            })
        })
}

const update = (req, res) => {

    const body = req.body

    const hash = bcrypt.hashSync(body.password, 10);

    const updateHealthOfficial = {
        name: body.name,
        password: hash,
        familyName: body.familyName,
        phone: body.phone
    }

    models.HealthOfficial.update(updateHealthOfficial, { where: { email: body.email } })
        .then(result => {
            res.status(200).json({
                message: "Updated Successfully",
                user: result
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                user: error
            })
        })
}

const sendVerificationCode = (req, res) => {
    models.HealthOfficial.findOne({ where: { email: req.body.email } })
    try {
        sendMail(req.body.email, res)
        const updateHealthOfficial = {
            verificationCode: code
        }
        models.HealthOfficial.update(updateHealthOfficial, { where: { email: req.body.email } })
    }
    catch {
        (err) => {
            res.status(404).json("User Not Found")
        }
    }
}

const forgetPassword = (req, res) => {
    models.HealthOfficial.findOne({ where: { email: req.body.email } })
        .then((result) => {
            if (result.verificationCode == req.body.verificationCode) {
                if (req.body.password === req.body.confirmPassword) {
                    const hash = bcrypt.hashSync(req.body.password, 10);
                    const updatePassword = {
                        password: hash
                    }
                    models.HealthOfficial.update(updatePassword, { where: { email: result.email } })
                        .then(
                            res.status(200).json("Successfully Updated Password")
                        )
                }
                else {
                    res.status(422).json("Both Password don't matches")
                }
            }
            else {
                res.status(400).json("Invalid Code")
            }
        })
        .catch((err) => {
            res.status(404).json("User Not Found")
        })
}

const registerHealthOfficial = (req, res) => {

    models.HealthOfficial.findOne({ where: { email: req.body.registeredOfficialEmail } })
        .then(result => {
            console.log(result.email);
            if (result) {
                models.HealthOfficial.findOne({ where: { email: req.body.newOfficialEmail } })
                    .then(result => {
                        if (result) {
                            result.email
                            res.status(500).json({
                                message: "Email Exists",
                            })
                        }
                        else {
                            sendMail(req.body.newOfficialEmail, res)
                            const newHealthOfficial = {
                                email: req.body.newOfficialEmail,
                                verificationCode: code
                            }
                            models.HealthOfficial.create(newHealthOfficial)
                        }
                    })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "First register health officil by admin"
            })
        })
}

const verifyHealthOfficial = (req, res) => {
    models.HealthOfficial.findOne({ where: { email: req.body.newOfficialEmail } })
        .then(result => {
            if (result.verificationCode == req.body.verificationCode) {
                if (req.body.password === req.body.confirmPassword) {
                    const hash = bcrypt.hashSync(req.body.password, 10);
                    const newHealthOfficial = {
                        name: req.body.name,
                        password: hash,
                        familyName: req.body.familyName,
                        phone: req.body.phone
                    }
                    models.HealthOfficial.update(newHealthOfficial, { where: { email: req.body.newOfficialEmail } })
                        .then(result => {
                            res.status(200).json({
                                message: "Created Successfully",
                            })
                        })
                        .catch(error => {
                            res.status(500).json({
                                message: "Something went wrong",
                            })
                        })
                }
                else {
                    res.status(422).json("Both Password don't matches")
                }
            }
            else {
                res.status(400).json("Invalid Code")
            }
        })
        .catch((err) => {
            res.status(404).json("User Not Found")
        })
}

module.exports = {
    login: login,
    show: show,
    update: update,
    registerHealthOfficial: registerHealthOfficial,
    sendVerificationCode: sendVerificationCode,
    forgetPassword: forgetPassword,
    verifyHealthOfficial: verifyHealthOfficial

}