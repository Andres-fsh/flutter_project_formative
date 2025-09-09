const db = require('../models');

const getAllTypeForms = async () => {
    try {
        let typeForms = await db.TypeForms.findAll({
            include: [{
                model: db.LinesSennova,
                as: 'lineSennova',
                attributes: ['id', 'name', 'description']
            }]
        });
        return typeForms;
    } catch (error) {
        return error.message || "Failed to get type forms";
    }
};

const getTypeForm = async (id) => {
    try {
        let typeForm = await db.TypeForms.findByPk(id, {
            include: [{
                model: db.LinesSennova,
                as: 'lineSennova',
                attributes: ['id', 'name', 'description']
            }]
        });
    
        return typeForm;
    } catch (error) {
        return error.message || "Failed to get type form";
    }
};

const createTypeForm = async (description, fkIdLinesSennova) => {
    try {
        let newTypeForm = await db.TypeForms.create({
            description,
            fkIdLinesSennova
        });
        return newTypeForm;
    } catch (error) {
        return error.message || "Type form could not be created";
    }
};

const updateTypeForm = async (id, description, fkIdLinesSennova) => {
    try {
        let updatedTypeForm = await db.TypeForms.update({
            description,
            fkIdLinesSennova
        }, {
            where: { id }
        });
        return updatedTypeForm;
    } catch (error) {
        return error.message || "Type form could not be updated";
    }
};

const deleteTypeForm = async (id) => {
    try {
        const deletedTypeForm = await db.TypeForms.destroy({
            where: { id }
        });
        return deletedTypeForm;
    } catch (error) {
        return error.message || "Type form could not be deleted";
    }
};

module.exports = {
    getAllTypeForms,
    getTypeForm,
    createTypeForm,
    updateTypeForm,
    deleteTypeForm
};