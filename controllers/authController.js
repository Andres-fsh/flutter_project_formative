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
  try {
    return await Users.findOne({
      where: { email: login },
      attributes: ['id', 'name', 'lastName', 'email', 'phone', 'photo', 'password', 'fkIdRoles'], // ✅ fkIdRoles con S
    });
  } catch (error) {
    console.error('Error en findUserByEmail:', error);
    throw error;
  }
}

async function comparePassword(input, stored) {
  if (!stored) return false;
  try {
    const isHash =
      stored.startsWith('$2a$') ||
      stored.startsWith('$2b$') ||
      stored.startsWith('$2y$');
    if (isHash) return await bcrypt.compare(input, stored);
    return input === stored;
  } catch {
    return false;
  }
}

module.exports = {
  // POST /api/v1/auth/login
  async login(req, res) {
    try {
      console.log('🔐 Login attempt with:', req.body);
      
      const { email, password } = req.body || {};
      
      if (!email || !password) {
        console.log('❌ Missing credentials');
        return res.status(400).json({ status: 'Error', message: 'Faltan credenciales' });
      }

      const user = await findUserByEmail(email);
      console.log('👤 User found:', user ? `Yes (ID: ${user.id})` : 'No');
      
      if (!user) {
        return res.status(401).json({ status: 'Error', message: 'Usuario o contraseña inválidos' });
      }

      console.log('🔑 Stored password:', user.password ? 'Exists' : 'Missing');
      console.log('🎭 User role ID (fkIdRoles):', user.fkIdRoles);

      const ok = await comparePassword(password, user.password);
      console.log('🔑 Password match:', ok);
      
      if (!ok) {
        return res.status(401).json({ status: 'Error', message: 'Usuario o contraseña inválidos' });
      }

      // Traemos el rol por FK - ✅ CORREGIDO: fkIdRoles
      let roleObj = null;
      if (user.fkIdRoles) {
        const role = await Roles.findByPk(user.fkIdRoles, { attributes: ['id', 'name'] });
        if (role) {
          roleObj = { id: role.id, name: role.name };
          console.log('🎭 Role found:', roleObj);
        } else {
          console.log('❌ Role not found for ID:', user.fkIdRoles);
        }
      } else {
        console.log('❌ No role ID (fkIdRoles) for user');
      }

      const payload = {
        userId: user.id,
        email: user.email,
        rol: roleObj,
        name: user.name || '',
        lastName: user.lastName || '',
      };

      const token = signToken(payload);
      console.log('✅ Login successful for user:', user.email);

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
      console.error('❌ Auth.login error:', err);
      console.error('❌ Error stack:', err.stack);
      return res.status(500).json({ 
        status: 'Error', 
        message: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'production' ? undefined : err.message
      });
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