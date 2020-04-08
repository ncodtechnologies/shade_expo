var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  db.query('select narration, sale from tbldevice_sale limit 10', function (err, rows, fields) {
    if (err) throw err

    return res.send(rows); 
  })

});

module.exports = router;