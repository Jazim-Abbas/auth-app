var express = require('express');
var router = express.Router();
const healthOfficial = require("../controlers/healthOfficial")
const validation = require("../middlewares/validation")
const healthOfficialSchema = require("../validations/healthOfficial")
const authentication = require("../middlewares/authenticateToken")

router.post("/login", validation(healthOfficialSchema), healthOfficial.login)
router.patch("/update", authentication, healthOfficial.update)
router.get("/profile", authentication, healthOfficial.show)
router.post("/register", healthOfficial.register)

module.exports = router;