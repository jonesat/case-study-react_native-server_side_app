var express = require('express');
var router = express.Router();
const mysql=require('mysql2');

router.get("/", function (req, res, next) {
    var query = "SELECT VERSION();";
    req.db.query(query, function (err, rows) {
    if (err) {
        console.log(err);
    throw err;
    } else {
        console.log(rows);
        res.json({
        Error: false,
        Message: "Version Logged Successfully",
            });
        }
    });
});
          


module.exports=router;