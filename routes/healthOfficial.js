var express = require('express');
var router = express.Router();
const healthOfficial = require("../controlers/healthOfficial")
const validation = require("../middlewares/validation")
const { healthOfficialSchema, forgetPasswordSchema, registerSchema, newOfficialSchema } = require("../validations/healthOfficial")
const authentication = require("../middlewares/authenticateToken")

router.post("/login", validation(healthOfficialSchema), healthOfficial.login)
router.patch("/update", authentication, healthOfficial.update)
router.get("/profile", authentication, healthOfficial.show)
router.post("/register", authentication, validation(registerSchema), healthOfficial.registerHealthOfficial)
router.post("/send-verification-code", validation(forgetPasswordSchema), healthOfficial.sendVerificationCode);
router.post("/forget-password", validation(forgetPasswordSchema), healthOfficial.forgetPassword);
router.post("/verify-new-official", validation(newOfficialSchema), healthOfficial.verifyHealthOfficial);

module.exports = router;