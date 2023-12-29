const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.sk, (err, decoded) => {
      if (err) {
        res.status(401).json({message:"User is not authorized"});
      }
      req.user = decoded.user;
      next();
    });

    if (!token) {
      res.status(401).json({message:"User is not authorized or token is missing"});
    }
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {validateToken,verifyTokenAndAuthorization}
