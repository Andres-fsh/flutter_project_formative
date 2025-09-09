const db = require('../models');

const getAllLinesSennova = async () => {
    try {
        let linesSennova = await db.LinesSennova.findAll({
            include: [{
                model: db.Users,
                as: 'user',
                attributes: ['id', 'userName', 'name', 'lastName', 'email']
            }]
        });
        return linesSennova;
    } catch (error) {
        return error.message || "Failed to get lines sennova";
    }
};

const getLineSennova = async (id) => {
    try {
        let lineSennova = await db.LinesSennova.findByPk(id, {
            include: [{
                model: db.Users,
                as: 'user',
                attributes: ['id', 'userName', 'name', 'lastName', 'email']
            }]
        });
    
        return lineSennova;
    } catch (error) {
        return error.message || "Failed to get line sennova";
    }
};

const createLineSennova = async (name, description, fkIdUsers) => {
    try {
        let newLineSennova = await db.LinesSennova.create({
            name,
            description,
            fkIdUsers
        });
        return newLineSennova;
    } catch (error) {
        return error.message || "Line sennova could not be created";
    }
};

const updateLineSennova = async (id, name, description, fkIdUsers) => {
    try {
        let updatedLineSennova = await db.LinesSennova.update({
            name,
            description,
            fkIdUsers
        }, {
            where: { id }
        });
        return updatedLineSennova;
    } catch (error) {
        return error.message || "Line sennova could not be updated";
    }
};

const deleteLineSennova = async (id) => {
    try {
        const deletedLineSennova = await db.LinesSennova.destroy({
            where: { id }
        });
        return deletedLineSennova;
    } catch (error) {
        return error.message || "Line sennova could not be deleted";
    }
};

module.exports = {
    getAllLinesSennova,
    getLineSennova,
    createLineSennova,
    updateLineSennova,
    deleteLineSennova
};