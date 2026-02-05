const jwt = require('jsonwebtoken');
const User = require("../models/User");

/**
 * @param {...string} roles allowed roles (ex: 'Owner', 'Manager')
 */
const authorize = (...roles) => {
  return async (req, res, next) => {
    let token;

    try {
      // 1. Get token from Header (Bearer)
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      } 
      // 2. If no header, get token from Cookies (for Web/Credentials)
      else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
      }

      if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
      }

      // 3. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Get user and attach to request
      const user = await User.findById(decoded.id).select('-password');
       console.log(roles.length ,roles.includes(user.role))
      if (!user) {
        return res.status(401).json({ message: 'User no longer exists' });
      }

      // 5. Role check
      if (roles.length > 0 && !roles.includes(user.role)) {
       
        return res.status(403).json({
          message: `Forbidden: Role '${user.role}' does not have access`,
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  };
};

module.exports = authorize;