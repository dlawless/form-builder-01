var express = require('express');
var router = express.Router();
var mongoskin = require('mongoskin');
var ObjectID = require('mongoskin').ObjectID;

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

router.get('/forms/:id', function(req, res) {
    db.collection('forms').findOne({_id: new ObjectID(req.params.id)}, function(err, result) {
       res.send(result);
    });
});

router.put('/forms/:id', function(req, res) {
    var form = req.body;
    form._id = new ObjectID(form._id);
    db.collection('forms').updateById(req.params.id, {$set:req.body}, {safe:true, multi:false}, function(err, result) {
        if(err) {
            console.log('err: ' + JSON.stringify(err, null, 2));
        }
        res.send((result===1)?{msg:'success'}:{msg:'error'});
    })
});

router.post('/forms', function(req, res) {
   db.collection('forms').insert(req.body, function(err, result) {
       if(err){
           res.send({msg: err})
       }

       res.send(result);
   });
});

router.get('/dataTypes', function(req, res) {
    var dataTypes = [
        {name:'text'},
        {name:'number'},
        {name:'date'}
    ];
    res.send(dataTypes);
});

module.exports = router;
