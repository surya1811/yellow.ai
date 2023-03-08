const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/auth');
const contactsRouter = require('./routes/contacts');
const config = require('./config');

const app = express();

// Set up CORS middleware
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Set up routes
app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);

// Set up error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
