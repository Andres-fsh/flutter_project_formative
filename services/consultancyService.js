const db = require('../models');

const getAllConsultancies = async () => {
    try {
        let consultancies = await db.Consultancies.findAll({
            include: [{
                model: db.Users,
                as: 'user',
                attributes: ['id', 'userName', 'name', 'lastName', 'email']
            }]
        });
        return consultancies;
    } catch (error) {
        return error.message || "Failed to get consultancies";
    }
};

const getConsultancy = async (id) => {
    try {
        let consultancy = await db.Consultancies.findByPk(id, {
            include: [{
                model: db.Users,
                as: 'user',
                attributes: ['id', 'userName', 'name', 'lastName', 'email']
            }]
        });
    
        return consultancy;
    } catch (error) {
        return error.message || "Failed to get consultancies";
    }
};

const createConsultancy = async (date, state, description, fkIdUsers) => {
    try {
        let newConsultancy = await db.Consultancies.create({
            date,
            state,
            description,
            fkIdUsers
        });
        return newConsultancy;
    } catch (error) {
        return error.message || "Consultancies could not be created";
    }
};

const updateConsultancy = async (id, date, state, description, fkIdUsers) => {
    try {
        let updatedConsultancy = await db.Consultancies.update({
            date,
            state,
            description,
            fkIdUsers
        }, {
            where: { id }
        });
        return updatedConsultancy;
    } catch (error) {
        return error.message || "Consultancies could not be updated";
    }
};

const deleteConsultancy = async (id) => {
    try {
        const deletedConsultancy = await db.Consultancies.destroy({
            where: { id }
        });
        return deletedConsultancy;
    } catch (error) {
        return error.message || "Consultancies could not be deleted";
    }
};

module.exports = {
    getAllConsultancies,
    getConsultancy,
    createConsultancy,
    updateConsultancy,
    deleteConsultancy
};