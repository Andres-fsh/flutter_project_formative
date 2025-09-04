const db = require ('../models');

const getAllRoles = async () =>{
    try {
        let roles = await db.Roles.findAll();
        return roles;

    }catch (error) {
        return error.message || "failed to get roles";
    }
};

const getRole = async(id) => {
    try {
        let roles = await db.Roles.findByPk(id);
        return roles;
    } catch (error) {
        return error.message || "Failed to get roles";
    }
};

const createRole = async (name,description) => {
    try {
        let newRole = await db.Roles.create({
            name,
            description
        });
        return newRole;
    } catch (error) {
        return error.message || "Rol could not be created";
    }
};

const updateRole = async (id,name,description) => {
    try {
        let updatedRol = await db.Roles.update({
            name,
            description
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

const deleteRole = async (id) => {
    try {
        const deletedRole = await db.Roles.destroy({
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
    createRole,
    updateRole,
    deleteRole,
};