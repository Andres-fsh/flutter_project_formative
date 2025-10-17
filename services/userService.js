const db = require('../models');

const getAllUsers = async () => {
    try {
    
        let users = await db.Users.findAll({
            include: [{
                model: db.Roles,
                as: 'role', 
                attributes: ['id', 'name'] 
            }]
        });
        return users;
    } catch (error) {
        return error.message || "Failed to get users";
    }
};

const getUser = async (id) => {
    try {
        
        let user = await db.Users.findByPk(id, {
            include: [{
                model: db.Roles,
                as: 'role',
                attributes: ['id', 'name']
            }]
        });
        return user;
    } catch (error) {
        return error.message || "Failed to get user";
    }
};

const createUser = async (userName, password, email, name, lastName, phone, photo, fkIdRoles) => {
  try {
    let newUser = await db.Users.create({
      userName,
      password,
      email,
      name,
      lastName,
      phone,
      photo,
      fkIdRoles
    });

  
    const userWithRole = await db.Users.findByPk(newUser.id, {
      include: [{
        model: db.Roles,
        as: 'role',
        attributes: ['id', 'name']
      }]
    });

    return userWithRole;
  } catch (error) {
    throw new Error(error.message || "User could not be created");
  }
};

const updateUser = async (id, userName, password, email, name, lastName, phone, photo, fkIdRoles) => {
  try {
    
    const [updatedCount] = await db.Users.update({
      userName,
      password,
      email,
      name,
      lastName,
      phone,
      photo,
      fkIdRoles
    }, {
      where: { id }
    });

    if (updatedCount > 0) {
      const updatedUser = await db.Users.findByPk(id, {
        include: [{
          model: db.Roles,
          as: 'role',
          attributes: ['id', 'name']
        }]
      });
      return updatedUser;
    } else {
      throw new Error("Usuario no encontrado o no se pudo actualizar");
    }
  } catch (error) {
    throw new Error(error.message || "User could not be updated");
  }
};

const deleteUser = async (id) => {
    try {
        const deletedUser = await db.Users.destroy({
            where: { id }
        });
        return deletedUser;
    } catch (error) {
        return error.message || "User could not be deleted";
    }
};

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};