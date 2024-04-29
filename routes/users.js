var express = require('express');
var router = express.Router();
var staff = require('../controllers/staffController');
var auth = require('../middleware/auth')

/* GET users listing. */
router.post('/', auth.auth_check,staff.insertstaff);
router.post('/login', staff.login);
router.get('/logout', staff.logout);
router.get('/view_staff',auth.auth_check, staff.getstaff);
router.get('/getstaff/:id', auth.auth_check,staff.getonestaff);
router.put('/update_staff/:id', staff.updatestaff);
router.delete('/delete_staff/:id', staff.deletestaff);
router.get('/staffview_task',staff.viewtaskstaff);
router.get('/accept/:id', staff.accpettask);
router.get('/decline/:id', staff.declinetask);
router.get('/completed/:id', staff.completedtask);
// router.get('/staff_pending', staff.staffpending);

module.exports = router;
