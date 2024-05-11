var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

const authorize = (req,res,next)=>{
    const authorization = req.headers.authorization
    let token = null

    if(authorization && authorization.split(" ").length===2){
        token = authorization.split(" ")[1]
        console.log("Token: ",token)
    }else{
        console.log("Unauthorized user")
    }

    try{
        const decoded = jwt.verify(token,secretKey)
        if(decoded.exp <Date.now()){
            console.log("Token has expired")
            return
        }
    
    next()
    } catch(e){
        console.log("Token is not valid ",err)
    }
}

router.post("/", authorize, function(req, res) {
    const { docID } = req.body;
  
    if (!docID) {
      res.status(400).json({ message: "Error removing book" });
      return;
    }
  
    const username = req.body.username;
    const user_id = req.db.from('users').where("username", username).select("user_id");
  
    if (!user_id) {
      res.status(400).json({ message: "Invalid username" });
      return;
    }
  
    req.db('books')
      .where({ docID: docID, user_id: user_id })
      .del()
      .then((count) => {
        if (count > 0) {
          res.status(200).json({ message: `Book removed from the collection of ${username}` });
        } else {
          res.status(404).json({ message: `Book not found in the collection of ${username}` });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: true, message: "Error updating the database" });
      });
  });


module.exports = router;