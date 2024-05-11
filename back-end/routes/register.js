var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', function(req, res, next) { 


  const { username,password,email,first_name,last_name } = req.body;
  console.log(`The body has the following fields ${first_name} ${last_name} with username ${username} and email ${email}`)

  if (!email || !password || !username||!first_name||!last_name) {
    return res.status(400).json({
      error: true,
      message: "Request body incomplete, need all the information"
    });
  }
 
  req.db.from('users').select("first_name", "last_name", "username", "password", "email").where("email", email)
    .first()
    .then((user) => {
        if (user) {        
        res.status(409).json({"Error": true,"Message": "User already exists"});
        } else {        
            const saltRounds = 10;
            const hash = bcrypt.hashSync(password,saltRounds)
            return req.db.from('users').insert({ 
                username:username,
                password:password,
                email:email,
                first_name:first_name,
                last_name:last_name,
                hash:hash
             });
        }
    })
    .then(()=>{
        console.log(`I have created a user ${first_name} ${last_name} with username ${username} and email ${email}`)
        return res.status(201).json({"Error": false,"Message": "User created"});
    })    
    .catch((err) => {
        console.log(err);
        res.status(500).json({
        "Error": true,
        "Message": "Error in MySQL query"
        });
    });  
});

module.exports = router;