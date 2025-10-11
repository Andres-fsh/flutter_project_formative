// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../models');
const Users = db.Users;
const Roles = db.Roles;

function signToken(payload) {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '8h';
  return jwt.sign(payload, secret, { expiresIn });
}

async function findUserByEmail(login) {
  // En tu BD actual no hay userName, así que vamos por email directo
  return Users.findOne({
    where: { email: login },
    // aseguramos traer estos campos
    attributes: ['id', 'name', 'lastname', 'email', 'phone', 'photo', 'password', 'fkIdRol'],
  });
}

async function comparePassword(input, stored) {
  if (!stored) return false;
  try {
    const isHash =
      stored.startsWith('$2a$') ||
      stored.startsWith('$2b$') ||
      stored.startsWith('$2y$');
    if (isHash) return await bcrypt.compare(input, stored);
    return input === stored; // modo legado (texto plano)
  } catch {
    return false;
  }
}

module.exports = {
  // POST /api/v1/auth/login
  async login(req, res) {
    try {
      const { email, password } = req.body || {};
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

      // Traemos el rol por FK, evitando dependencias de asociaciones
      let roleObj = null;
      if (user.fkIdRol) {
        const role = await Roles.findByPk(user.fkIdRol, { attributes: ['id', 'name'] });
        if (role) roleObj = { id: role.id, name: role.name };
      }

      const payload = {
        userId: user.id,
        email: user.email,
        rol: roleObj,
        name: user.name || '',
        lastName: user.lastname || '',
      };

      const token = signToken(payload);

      return res.status(200).json({
        status: 'OK',
        message: 'Login exitoso',
        data: {
          token,
          user: {
            id: user.id,
            userName: null, // en tu esquema actual no existe
            email: user.email,
            name: user.name,
            lastName: user.lastname,
            phone: user.phone,
            photo: user.photo,
            rol: roleObj,
          },
        },
      });
    } catch (err) {
      console.error('Auth.login error:', err);
      return res.status(500).json({ status: 'Error', message: 'Error interno' });
    }
  },

  // GET /api/v1/auth/verify
  async verifyTokenController(req, res) {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
      if (!token) return res.status(401).json({ status: 'Error', message: 'Token requerido' });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.status(200).json({ status: 'OK', data: { valid: true, user: decoded } });
    } catch (err) {
      return res.status(401).json({ status: 'Error', message: 'Token inválido o expirado' });
    }
  },

  // GET /api/v1/auth/authenticated  (protegido con verifyToken)
  async getUserAuthenticated(req, res) {
    return res.status(200).json({ status: 'OK', data: { user: req.user } });
  },
};