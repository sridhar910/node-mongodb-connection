// app.js
// Connect Node.js to MongoDB using Mongoose

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection URL (local or Atlas)
const mongoURI = 'mongodb://localhost:27017/testingdb'; 
// For Atlas: 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/testDB?retryWrites=true&w=majority'

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Create a simple schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

// Create model
const User = mongoose.model('User', userSchema);

// Test route to add a user
app.post('/add-user', async (req, res) => {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});