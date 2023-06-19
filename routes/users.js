const router = require('express').Router();
const User = require('../models/user.model')

// Get all users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new user
router.route('/add').post((req, res) => {
    const { username, password, email } = req.body;
    const newUser = new User({ username, password, email });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get user by id
router.route('/getUser/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update user by id
router.route('/update/:id').put((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;
            user.password = req.body.password;
            user.email = req.body.email;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete user by id
router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Login route
router.route('/login').post((req, res) => {
  const { username, password } = req.body;

  // Check if username exists
  User.findOne({ username })
    .then(user => {
        console.log(password)
        console.log(username)
      if (!user) {
        return res.status(400).json('Username not found');
      }

      // Check if password is correct
      if (user.password !== password) {
        return res.status(400).json('Incorrect password');
      }

      // Authentication successful
      res.sendStatus(200);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/hello').get((req,res) => {
  res.status(200).json("hello!")
});

module.exports = router;

