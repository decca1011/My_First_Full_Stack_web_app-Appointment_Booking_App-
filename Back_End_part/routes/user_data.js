const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const editController = require('../controllers/edit');

const router = express.Router();

// POST request to insert a new user
router.post('/', userController.insertUser);

// GET request to retrieve all users
router.get('/', userController.getAllUsers);

router.delete('/:userId', editController.deleteUser);
 
router.post('/edit',  editController.editUser);
  
module.exports = router;
