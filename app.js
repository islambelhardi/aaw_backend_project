require("dotenv").config();
require("./src/configs/database").connect();
const express = require("express");
const auth = require("./src/middlewares/auth");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./src/routes/auth');
const usersRoutes = require('./src/routes/users');
const subjectsRoutes = require('./src/routes/subjects');
const marksRoutes = require('./src/routes/marks');
const reclamationsRoutes = require('./src/routes/reclamations');

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/subjects', subjectsRoutes);
// app.use('/api/marks', marksRoutes);
app.use('/api/reclamations', reclamationsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});
// Start the server
app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = app;