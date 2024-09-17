require("dotenv").config();

const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/jwtManager');
const cors = require("cors")

const app = express();
const port = 8080;
var users = [];

const secretKey = process.env.SECRET_KEY; 

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors({
  origin: process.env.frontend_url,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials:true,
  allowedHeaders: "Content-Type,Authorization",
}))

// User registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // console.log(username,password)
  users.push({ username, password });
  console.log(users);
  res.status(201).send('User registered');
});

// User login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.status(401).json('Please Check your details');

  const token = jwt.sign({ username: user.username }, secretKey);
  res.status(200).json({ token });
  console.log(users);
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.status(200).json(`Hello ${req.user.username}, this is a protected route.`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
