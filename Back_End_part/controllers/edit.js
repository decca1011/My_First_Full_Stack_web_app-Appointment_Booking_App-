 // controllers/edit.js
  const UserModel = require('../models/user'); // UserModel defined in models/user.js
  
  exports.deleteUser = (req, res, next) => {
    
    const userId = req.params.userId; // 
    UserModel.findByPk(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        return user.destroy() .then(result => {
          //console.log('Deleted user:', result);
          res.status(200).json({ message: 'User deleted successfully' });
        });
      })
      .catch(err => {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Failed to delete user' });
      });
  };
   
  exports.editUser = (req, res, next) => {
    const userId = req.body.userId;
    const updatedName = req.body.name;
    const updatedPass = req.body.pass;
    const updatedEm = req.body.em;

    UserModel.findByPk(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        user.name = updatedName;
        user.pass = updatedPass;
        user.em = updatedEm;
  
        return user.save();
      })
      .then(result => {
       // console.log('Updated user:', result);
        res.status(200).json(result); // customize the response as needed
      })
      .catch(err => {
       // console.error('Error updating user:', err);
        res.status(500).json({ error: 'Failed to update user' });
      });
  };
  
 
  



