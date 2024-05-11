const mysql=require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'Qut2023!',
    database:'bookapp'
});
connection.connect(function(err){
    if(err) throw err;
});

module.exports = (req,res,next)=>{
    req.db=connection;
    next();
  }