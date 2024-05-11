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

router.post("/", authorize, async function(req, res) {
  const { title, author, genre, docID } = req.body;

  if (!title || !author || !genre || !docID) {
    res.status(400).json({ message: "Error inserting book" });
    return;
  }

  const username = req.body.username;
  const user_id = await req.db.from('users').where("username", username).select("user_id").first();

  if (!user_id) {
    res.status(400).json({ message: "Invalid username" });
    return;
  }

  const book = {
    title: title,
    author: author,
    genre: genre,
    docID: docID,
    user_id: user_id,
  };

  req.db.insert(book)
    .into('books')
    .then(() => {
      res.status(200).json({ message: `Book added to the collection for ${username}` });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: true, message: "Error updating the database" });
    });
});


module.exports = router;