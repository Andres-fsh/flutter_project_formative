const db = require ('../models');

const getAllRoles = async () =>{
    try {
        let roles = await db.Role.findAll();
        return roles;

    }catch (error) {
        return error.message || "failed to get roles";
    }
};

const getUser =async