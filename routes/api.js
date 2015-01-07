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
        {name:'date'},
        {name:'date / time'},
        {name:'list of options'},
        {name:'zip'},
        {name:'phone'},
        {name:'us state name'},
        {name:'us state abbreviation'}
    ];
    res.send(dataTypes);
});

router.get('/states', function(req, res) {
    var states = [
        { "name":"Alabama", "abbreviation":"AL" },
        { "name":"Alaska", "abbreviation":"AK" },
        { "name":"Arizona", "abbreviation":"AZ" },
        { "name":"Arkansas", "abbreviation":"AR" },
        { "name":"California", "abbreviation":"CA" },
        { "name":"Colorado", "abbreviation":"CO" },
        { "name":"Connecticut", "abbreviation":"CT" },
        { "name":"Delaware", "abbreviation":"DE" },
        { "name":"Florida", "abbreviation":"FL" },
        { "name":"Georgia", "abbreviation":"GA" },
        { "name":"Hawaii", "abbreviation":"HI" },
        { "name":"Idaho", "abbreviation":"ID" },
        { "name":"Illinois", "abbreviation":"IL" },
        { "name":"Indiana", "abbreviation":"IN" },
        { "name":"Iowa", "abbreviation":"IA" },
        { "name":"Kansas", "abbreviation":"KS" },
        { "name":"Kentucky", "abbreviation":"KY" },
        { "name":"Louisiana", "abbreviation":"LA" },
        { "name":"Maine", "abbreviation":"ME" },
        { "name":"Maryland", "abbreviation":"MD" },
        { "name":"Massachusetts", "abbreviation":"MA" },
        { "name":"Michigan", "abbreviation":"MI" },
        { "name":"Minnesota", "abbreviation":"MN" },
        { "name":"Mississippi", "abbreviation":"MS" },
        { "name":"Missouri", "abbreviation":"MO" },
        { "name":"Montana", "abbreviation":"MT" },
        { "name":"Nebraska", "abbreviation":"NE" },
        { "name":"Nevada", "abbreviation":"NV" },
        { "name":"New Hampshire", "abbreviation":"NH" },
        { "name":"New Jersey", "abbreviation":"NJ" },
        { "name":"New Mexico", "abbreviation":"NM" },
        { "name":"New York", "abbreviation":"NY" },
        { "name":"North Carolina", "abbreviation":"NC" },
        { "name":"North Dakota", "abbreviation":"ND" },
        { "name":"Ohio", "abbreviation":"OH" },
        { "name":"Oklahoma", "abbreviation":"OK" },
        { "name":"Oregon", "abbreviation":"OR" },
        { "name":"Pennsylvania", "abbreviation":"PA" },
        { "name":"Rhode Island", "abbreviation":"RI" },
        { "name":"South Carolina", "abbreviation":"SC" },
        { "name":"South Dakota", "abbreviation":"SD" },
        { "name":"Tennessee", "abbreviation":"TN" },
        { "name":"Texas", "abbreviation":"TX" },
        { "name":"Utah", "abbreviation":"UT" },
        { "name":"Vermont", "abbreviation":"VT" },
        { "name":"Virginia", "abbreviation":"VA" },
        { "name":"Washington", "abbreviation":"WA" },
        { "name":"West Virginia", "abbreviation":"WV" },
        { "name":"Wisconsin", "abbreviation":"WI" },
        { "name":"Wyoming", "abbreviation":"WY" }
    ];
    res.send(states);
})

router.post('/formResponses', function(req, res){
    db.collection('formResponses').insert(req.body, function(err, result) {
        if(err) {
            res.send({msg: err});
        }
        res.send(result);
    });
});

router.get('/formResponses/:id', function(req, res) {
    db.collection('formResponses').find({parentId: req.params.id}).toArray(function(err, results) {
        if(err) {
            res.send({msg: err});
        }
        res.send(results);
    });
});


module.exports = router;
