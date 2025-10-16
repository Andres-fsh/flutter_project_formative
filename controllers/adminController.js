const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../models');
const Users = db.Users;
const Roles = db.Roles;

async function findUserByEmail(login) {
  return Users.findOne({
    where: { email: login },
    attributes: ['id', 'name', 'lastname', 'email', 'phone', 'photo', 'password', 'fkIdRol'],
  });
}

async function comparePassword(input, stored) {
  if (!stored) return false;
  try {
    const isHash = stored.startsWith('$2a$') || stored.startsWith('$2b$') || stored.startsWith('$2y$');
    if (isHash) return await bcrypt.compare(input, stored);
    return input === stored;
  } catch {
    return false;
  }
}

module.exports = {

  async adminLogin(req, res) {
    try {
      const { email, password } = req.body || {};
      if (!email || !password) {
        return res.status(400).json({ 
          success: false, 
          message: 'Faltan credenciales' 
        });
      }

      const user = await findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: 'Usuario o contraseña inválidos' 
        });
      }

      const ok = await comparePassword(password, user.password);
      if (!ok) {
        return res.status(401).json({ 
          success: false, 
          message: 'Usuario o contraseña inválidos' 
        });
      }

      // Verificar si es administrador
      let roleObj = null;
      if (user.fkIdRol) {
        const role = await Roles.findByPk(user.fkIdRol, { attributes: ['id', 'name'] });
        if (role) {
          roleObj = { id: role.id, name: role.name };
          
          // SOLO permitir acceso a administradores
          if (role.name !== 'Administradores') {
            return res.status(403).json({ 
              success: false, 
              message: 'Acceso denegado. Solo administradores pueden acceder.' 
            });
          }
        }
      }

      const payload = {
        userId: user.id,
        email: user.email,
        rol: roleObj,
        name: user.name || '',
        lastName: user.lastname || '',
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRES_IN || '8h' 
      });

      return res.status(200).json({
        success: true,
        message: 'Login exitoso como Administrador',
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            lastName: user.lastname,
            phone: user.phone,
            photo: user.photo,
            role: roleObj, 
          },
        },
      });
    } catch (err) {
      console.error('Admin.login error:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Error interno del servidor' 
      });
    }
  },
};