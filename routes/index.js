var express = require('express');
var router = express.Router();
const admin = require('../controllers/adminController');
const auth = require('../middleware/auth')

/* GET home page. */
router.post('/',admin.insertadmin);
router.post('/login',admin.login);
router.get('/view_accept',auth.auth_check,admin.viewaccept);
router.get('/view_decline',auth.auth_check,admin.viewdecline);
router.get('/view_completd',auth.auth_check,admin.viewcompleted);
router.get('/view_pending',auth.auth_check,admin.viewpending);

module.exports = router;
