var express = require("express");
var router = express.Router();
const venueOwner = require("../controlers/venueOwner");
const validation = require("../middlewares/validation");
const { venueOwnerSchema, updateSchema } = require("../validations/venueOwner");
const { loginSchema } = require("../validations/user");
const authentication = require("../middlewares/authenticateToken");

router.post("/register", validation(venueOwnerSchema), venueOwner.register);
router.post("/login", validation(loginSchema), venueOwner.login);
router.patch(
  "/update",
  authentication,
  validation(updateSchema),
  venueOwner.update
);
router.get("/profile", authentication, venueOwner.show);

module.exports = router;
