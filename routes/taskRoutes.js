var express = require('express');
var router = express.Router();
const task = require('../controllers/taskController');
const auth = require('../middleware/auth')

/* GET home page. */
router.post('/add_task',task.inserttask);
router.get('/view_task',auth.auth_check,task.gettask);
router.get('/view_task/:id',auth.auth_check,task.getonetask);

module.exports = router;
