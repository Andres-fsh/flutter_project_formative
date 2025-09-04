const db = require('../models');

const getAllUsers = async () => {
    try {
        // Usa "include" para traer los datos del rol asociado
        let users = await db.Users.findAll({
            include: [{
                model: db.Roles,
                as: 'role', // Usa el alias definido en el modelo Users
                attributes: ['id', 'name'] // Selecciona solo los campos que necesitas
            }]
        });
        return users;
    } catch (error) {
        return error.message || "Failed to get users";
    }
};

const getUser = async (id) => {
    try {
        // También usa "include" para una sola búsqueda
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
        // Sequelize manejará la llave foránea automáticamente
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
        return newUser;
    } catch (error) {
        // El error de la llave foránea se mostrará aquí si el rol no existe
        return error.message || "User could not be created";
    }
};

const updateUser = async (id, userName, password, email, name, lastName, phone, photo, fkIdRoles) => {
    try {
        let updatedUser = await db.Users.update({
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
        return updatedUser;
    } catch (error) {
        return error.message || "User could not be updated";
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