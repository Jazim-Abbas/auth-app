var express = require('express');
var router = express.Router();
const healthOfficial = require("../controlers/healthOfficial")
const validation = require("../middlewares/validation")
const { healthOfficialSchema, forgetPasswordSchema, registerSchema, newOfficialSchema, loginHeahlthOfficialSchema } = require("../validations/healthOfficial")
const authentication = require("../middlewares/authenticateToken")
const passport = require("passport")
require("../middlewares/health-official-passport-setup")

router.post("/login", validation(loginHeahlthOfficialSchema), healthOfficial.login)
router.patch("/update", authentication, healthOfficial.update)
router.get("/profile", authentication, healthOfficial.show)
router.post("/register", authentication, validation(registerSchema), healthOfficial.registerHealthOfficial)
router.post("/send-verification-code", validation(forgetPasswordSchema), healthOfficial.sendVerificationCode);
router.post("/forget-password", validation(forgetPasswordSchema), healthOfficial.forgetPassword);
router.post("/verify-new-official", validation(newOfficialSchema), healthOfficial.verifyHealthOfficial);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google'), healthOfficial.googleLogin);


module.exports = router;