const express = require('express');
const router = express.Router();
const Controllers = require('../Controllers/UserController');

router.post('/signup', Controllers.register);
router.post('/login', Controllers.login);
router.get('/getuser',Controllers.getuser);
router.post('/refresh',Controllers.refreshToken);


module.exports = router;
