var express = require('express');
var router = express.Router();
var path = require('path');

router.use('*', function(req, res, next) {
    if ('user' in req.session) {
        next();
    } else {
        res.redirect('/login.html');
        //res.sendFile(path.join(__dirname, 'pages/index.html'));
    }
});

module.exports = router;
