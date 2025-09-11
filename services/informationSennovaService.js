const db = require('../models');

const getAllInformationSennova = async () => {
    try {
        let informationSennova = await db.InformationSennova.findAll();
        return informationSennova;
    } catch (error) {
        return error.message || "Failed to get information sennova";
    }
};

const getInformationSennova = async (id) => {
    try {
        let informationSennova = await db.InformationSennova.findByPk(id);
        return informationSennova;
    } catch (error) {
        return error.message || "Failed to get information sennova";
    }
};

const createInformationSennova = async (mision, vision, description, staff, lineSennova, ourServices, updateDate) => {
    try {
        let newInformationSennova = await db.InformationSennova.create({
            mision,
            vision,
            description,
            staff,
            lineSennova,
            ourServices,
            updateDate
        });
        return newInformationSennova;
    } catch (error) {
        return error.message || "Information sennova could not be created";
    }
};

const updateInformationSennova = async (id, mision, vision, description, staff, lineSennova, ourServices, updateDate) => {
    try {
        let updatedInformationSennova = await db.InformationSennova.update({
            mision,
            vision,
            description,
            staff,
            lineSennova,
            ourServices,
            updateDate
        }, {
            where: { id }
        });
        return updatedInformationSennova;
    } catch (error) {
        return error.message || "Information sennova could not be updated";
    }
};

const deleteInformationSennova = async (id) => {
    try {
        const deletedInformationSennova = await db.InformationSennova.destroy({
            where: { id }
        });
        return deletedInformationSennova;
    } catch (error) {
        return error.message || "Information sennova could not be deleted";
    }
};

module.exports = {
    getAllInformationSennova,
    getInformationSennova,
    createInformationSennova,
    updateInformationSennova,
    deleteInformationSennova
};