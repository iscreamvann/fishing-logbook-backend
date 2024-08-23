
import jwt from "jsonwebtoken"


export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }
  
    // Assuming the Authorization header is of the format: "Bearer token"
    const token = authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Token missing' });
    }

    const decodedToken = jwt.decode(
        token,
        process.env.JWT_SECRET
      );
  
    try {
      if (!decodedToken) {
        return res.status(401).json({ error: 'Invalid token' });
      }

  
      // Proceed to the next middleware/route handler
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };