// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../models');
const Users = db.Users;
const Roles = db.Roles;

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET no está configurado');
  }
  return secret;
}

function signToken(payload) {
  const secret = getJwtSecret();
  const expiresIn = process.env.JWT_EXPIRES_IN || '8h';
  return jwt.sign(payload, secret, { expiresIn });
}

async function findUserByEmail(email) {
  return Users.findOne({
    where: { email },
    attributes: ['id', 'name', 'lastName', 'email', 'phone', 'photo', 'password', 'fkIdRoles'],
  });
}

async function comparePassword(input, stored) {
  if (!stored) return false;
  return bcrypt.compare(input, stored);
}

module.exports = {
  // POST /api/v1/auth/login
  async login(req, res) {
    try {
      const { email, password } = req.body || {};

      // Evita loguear el body completo (incluye contraseña)
      console.log('🔐 Login attempt for:', email || '(no email)');

      if (!email || !password) {
        return res.status(400).json({ status: 'Error', message: 'Faltan credenciales' });
      }

      const user = await findUserByEmail(email);

      if (!user) {
        return res.status(401).json({ status: 'Error', message: 'Usuario o contraseña inválidos' });
      }

      const ok = await comparePassword(password, user.password);
      if (!ok) {
        return res.status(401).json({ status: 'Error', message: 'Usuario o contraseña inválidos' });
      }

      // Traer rol por FK (si existe)
      let roleObj = null;
      if (user.fkIdRoles) {
        const role = await Roles.findByPk(user.fkIdRoles, { attributes: ['id', 'name'] });
        if (role) roleObj = { id: role.id, name: role.name };
      }

      const payload = {
        userId: user.id,
        email: user.email,
        rol: roleObj,
        name: user.name || '',
        lastName: user.lastName || '',
      };

      const token = signToken(payload);

      console.log('✅ Login successful for:', user.email);

      return res.status(200).json({
        status: 'OK',
        message: 'Login exitoso',
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            phone: user.phone,
            photo: user.photo,
            rol: roleObj,
          },
        },
      });
    } catch (err) {
      console.error('❌ Auth.login error:', err.message);
      return res.status(500).json({
        status: 'Error',
        message: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'production' ? undefined : err.message,
      });
    }
  },

  // GET /api/v1/auth/verify
  // GET /api/v1/auth/verify
async verifyTokenController(req, res) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ status: 'Error', message: 'Token requerido' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ status: 'Error', message: 'JWT_SECRET no está configurado' });
    }

    const decoded = jwt.verify(token, secret);
    return res.status(200).json({ status: 'OK', data: { valid: true, user: decoded } });
  } catch (err) {
    return res.status(401).json({ status: 'Error', message: 'Token inválido o expirado' });
  }
},

  async getUserAuthenticated(req, res) {
    return res.status(200).json({ status: 'OK', data: { user: req.user } });
  },
};