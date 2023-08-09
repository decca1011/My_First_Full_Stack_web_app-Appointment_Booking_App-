const UserModel = require('../models/user'); // Assuming you have a UserModel defined in models/user.js
// Controller function to insert a new user
exports.insertUser =  (req, res,next) => {
  const name =req.body.name;
  const pass =req.body.pass;
  const em = req.body.em;
      // Use UserModel.create function to insert the user into the database
 UserModel.create({
      name: name,
      pass: pass,
      em: em,
    })
    .then(result => {
      console.log("user Data collected")
      res.status(201).json(result);
    
    })
    .catch (error => {  console.error('Error inserting user:', error);
      res.status(500).json({ error: 'Failed to insert user'})
  })
}


exports.getAllUsers = (req, res, next) => {
  UserModel.findAll()
    .then(users => {
      //console.log("Retrieved all users:", users);
      res.status(200).json(users);
    })
    .catch(error => {
      console.error('Error retrieving users:', error);
      res.status(500).json({ error: 'Failed to retrieve users' });
    });
};
