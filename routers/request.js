var express = require('express');
var router = express.Router();
var bmi_controller = require('../bmicontroller'); 

router.get('/',bmi_controller.Bmi);

module.exports = router;