const yup = require("yup")

const healthOfficialSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).max(10).required(),
    familyName: yup.string(),
    phone: yup.number()
})

const forgetPasswordSchema = yup.object({
    email: yup.string().email().required()
})


module.exports = { healthOfficialSchema, forgetPasswordSchema }