const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY; 

function authenticateToken(req, res, next) {
  // Retrieve the authorization header from the request
  const authHeader = req.headers['authorization'];

  // Extract the token from the authorization header
  const token = authHeader && authHeader.split(' ')[1];

  // Check if the token is null or undefined
  if (token == null) {
    // Return a 401 Unauthorized response if the token is missing
    return res.status(401).json({ message: "Your Token is missing" });
  }

  // Verify the token using the secret key
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      // Return a 403 Forbidden response if the token is invalid or expired
      return res.status(403).json({ message: "You token is invalid or expired" });
    }

    // Attach the verified user to the request object
    req.user = user;

    // Call the next middleware function
    next();
  });
}

module.exports = authenticateToken;
