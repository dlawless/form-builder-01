var express = require('express');
var router = express.Router();
//var mongoskin = require('mongoskin');


/* GET home page. */
router.get('/:id', function(req, res) {
    res.render('formRender', { title: 'Form Builder', id: req.params.id });
});

module.exports = router;
