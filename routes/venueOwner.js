var express = require("express");
var router = express.Router();
const venueOwner = require("../controlers/venueOwner");
const validation = require("../middlewares/validation");
const { venueOwnerSchema, updateSchema, forgetPasswordSchema } = require("../validations/venueOwner");
const { loginSchema } = require("../validations/user");
const authentication = require("../middlewares/authenticateToken");
const passport = require("passport")
require("../middlewares/venue-owner-passport-setup")

router.post("/register", validation(venueOwnerSchema), venueOwner.register);
router.post("/login", validation(loginSchema), venueOwner.login);
router.post("/send-verification-code", validation(forgetPasswordSchema), venueOwner.sendVerificationCode);
router.post("/forget-password", validation(forgetPasswordSchema), venueOwner.forgetPassword);
router.patch(
  "/update",
  authentication,
  validation(updateSchema),
  venueOwner.update
);
router.get("/profile", authentication, venueOwner.show);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google'), venueOwner.googleLogin);

module.exports = router;
