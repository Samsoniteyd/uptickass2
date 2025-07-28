import express from 'express';
import connectDB from './config/database';
// import userRouter from './routes/user.router';
import userRouter from './routes/user.router';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRouter); 

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});







// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const sequelize = require('./config/database');
// const userRoutes = require('./routes/user.router');

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api/users', userRoutes);

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// sequelize.sync({ force: true }).then(() => {
//   console.log('Database synced');
//   app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
//   });
// }).catch(error => {
//   console.error('Unable to connect to the database:', error);
// });