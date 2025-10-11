// api/v1/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

function getBearer(req) {
  const authHeader = req.headers.authorization || '';
  return authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
}

async function verifyToken(req, res, next) {
  const token = getBearer(req);
  if (!token) {
    return res.status(401).json({ status: 'Error', message: 'Token requerido' });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES_IN ? { maxAge: process.env.JWT_EXPIRES_IN } : undefined
    );
    req.user = decoded; // { userId, email, rol, name, lastName }
    return next();
  } catch (err) {
    return res.status(401).json({ status: 'Error', message: 'Token inválido o expirado' });
  }
}

module.exports = { verifyToken };
