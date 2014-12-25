var express = require('express');
var router = express.Router();
var mongoskin = require('mongoskin');


/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Form Builder' });
});

module.exports = router;
