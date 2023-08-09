const path  = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database'); // Assuming you have the database setup in util/database.js
const app = express();
const userRoutes = require('./routes/user_data');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(cors());

// API endpoint to insert a new user
app.use('/post/user', userRoutes);

// API endpoint to get all users
app.use('/get/user', userRoutes);

// API endpoint to perform delete and edit task on user data
app.use('/user', userRoutes);
 

app.get('/', (req, res) => {  res.send('Welcome to the Appointment Booking App'); });

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: 'Internal Server Error' });
});
 
sequelize.sync().then(result => {
  app.listen(3000) 
}).catch(err => {
  console.log(err);
});
