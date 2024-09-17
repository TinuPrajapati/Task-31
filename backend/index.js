require("dotenv").config();

const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/jwtManager');
const cors = require("cors")
const app = express();
const users = [];

app.use(cors({
  origin: process.env.frontend_url,
  methods: ["GET", "POST"],
  credentials:true,
  allowedHeaders: "Content-Type,Authorization",
}));

app.use(express.urlencoded({extended:true}))
app.use(express.json());


app.get("/",(req,res)=>{
  res.send("Hello World");
})

// User registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.status(201).send('User registered');
});

// User login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.status(401).json('Please Check your details');

  const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY);
  res.status(200).json({ token });
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.status(200).json(`Hello ${req.user.username}, this is a protected route.`);
});

app.listen(8080, () => {
  console.log(`Server Start`);
});
