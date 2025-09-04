const db = require ('../models');

const getAllRoles = async () =>{
    try {
        let roles = await db.Role.findAll();
        return roles;

    }catch (error) {
        return error.message || "failed to get roles";
    }
};

const getRole = async(id) => {
    try {
        let roles = await db.Role.findAll();
        return roles;
    } catch (error) {
        return error.message || "Failed to get roles";
    }
};

const createRol = async (name,email,password) => {
    try {
        let newRole = await db.Rol.create({
            name,
            email,
            password,
        });
    } catch (error) {
        return error.message || "Rol could not be created";
    }
};
const updateRol = async (id,name,email,password) => {
    try {
        let updatedRol = await db.Rol.update({
            name,
            email,
            password
        }, {
            where : {
                id,
            }
        });
        return updatedRol;
    } catch (error) {
        return error.message || "Rol could not be updated";
    }
};

const deleteRol = async (id) => {
    try {
        const deletedRole = await db.Rol.destroy({
            where: {
                id,
            }
        });
        return deletedRole
    } catch (error) {
        return error.message || "Rol could not be deleted";
    }
}
module.exports = {
    getAllRoles,
    getRole,
    createRol,
    updateRol,
    deleteRol,
};