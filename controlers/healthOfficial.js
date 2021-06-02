const models = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const env = require("dotenv").config()

const register = (req, res) => {
    const body = req.body
    const hash = bcrypt.hashSync(body.password, 10);

    models.HealthOfficial.findOne({ where: { email: body.email } })
        .then(result => {
            if (result) {
                res.status(500).json({
                    message: "Email Exists"
                })
            }
            else {
                if (body.password === body.confirmPassword) {
                    const newHealthOfficial = {
                        name: body.name,
                        email: body.email,
                        password: hash,
                        familyName: body.familyName,
                        phone: body.phone
                    }
                    models.HealthOfficial.create(newHealthOfficial)
                    res.status(200).json({
                        message: "Successfully Registered"
                    })
                }
                else {
                    res.status(500).json({
                        message: "Both Password don't matches"
                    })
                }

            }

        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong"
            })
        })
}

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


module.exports = {
    login: login,
    show: show,
    update: update,
    register: register
}