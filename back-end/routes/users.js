var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.db.from('users').select("first_name","last_name","username","password","email")
    .then((rows)=>{
      res.json({"Error":false,"Message":"Success","User":rows})
    })
    .catch((err)=>{
      console.log(err);
      res.json({"Error":true,"Message":"Error in MySQL query"})
    })
});

module.exports = router;

