var express = require('express');
var router = express.Router();
var mongoskin = require('mongoskin');

var db = mongoskin.db('mongodb://form_builder_user:password1@ds063140.mongolab.com:63140/heroku_app32834158', {safe:true});

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Form Builder' });
});

router.get('/forms', function(req, res) {
    db.collection('forms').find({}).toArray(function(err, results) {
        if (err) return next(err);
        res.send(results);
    })
});

module.exports = router;
