var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  console.log(`u: ${username} pw: ${password}`);

  if (!username || !password) {
    res.status(400).json({
      error: true,
      message: 'Request body incomplete - username and password needed'
    });
    return;
  }

  const queryUsers = req.db.from('users').select('*').where('username', '=', username);
  queryUsers
    .then(users => {
      if (users.length === 0) {
        console.log('User does not exist');
        res.status(400).json({
          error: true,
          message: 'User does not exist'
        });
        return;
      }

      const user = users[0];

      bcrypt.compare(password, user.hash)
        .then(match => {
          if (!match) {
            console.log('Passwords do not match');
            res.status(401).json({
              error: true,
              message: 'Incorrect password'
            });
            return;
          }

          const secretKey = 'secret key';
          const expires_in = 60 * 24 * 60; // 1 day
          const exp = Math.floor(Date.now() / 1000) + expires_in;

          const token = jwt.sign({ username, exp }, secretKey);
          res.json({
            token_type: 'Bearer',
            token,
            expires_in
          });

          console.log('Passwords Match');
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: true,
        message: 'Error querying the database'
      });
    });
});

module.exports = router;
