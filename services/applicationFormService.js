const db = require('../models');

const getAllApplicationForms = async () => {
    try {
        let applicationForms = await db.ApplicationForms.findAll({
            include: [{
                model: db.TypeForms,
                as: 'typeForm',
                attributes: ['id', 'description']
            }]
        });
        return applicationForms;
    } catch (error) {
        return error.message || "Failed to get application forms";
    }
};

const getApplicationForm = async (id) => {
    try {
        let applicationForm = await db.ApplicationForms.findByPk(id, {
            include: [{
                model: db.TypeForms,
                as: 'typeForm',
                attributes: ['id', 'description']
            }]
        });
    
        return applicationForm;
    } catch (error) {
        return error.message || "Failed to get application form";
    }
};

const createApplicationForm = async (userType, name, identificationType, email, phone, companyName, description, fkIdTypeForms) => {
    try {
        let newApplicationForm = await db.ApplicationForms.create({
            userType,
            name,
            identificationType,
            email,
            phone,
            companyName,
            description,
            fkIdTypeForms
        });
        return newApplicationForm;
    } catch (error) {
        return error.message || "Application form could not be created";
    }
};

const updateApplicationForm = async (id, userType, name, identificationType, email, phone, companyName, description, fkIdTypeForms) => {
    try {
        let updatedApplicationForm = await db.ApplicationForms.update({
            userType,
            name,
            identificationType,
            email,
            phone,
            companyName,
            description,
            fkIdTypeForms
        }, {
            where: { id }
        });
        return updatedApplicationForm;
    } catch (error) {
        return error.message || "Application form could not be updated";
    }
};

const deleteApplicationForm = async (id) => {
    try {
        const deletedApplicationForm = await db.ApplicationForms.destroy({
            where: { id }
        });
        return deletedApplicationForm;
    } catch (error) {
        return error.message || "Application form could not be deleted";
    }
};

module.exports = {
    getAllApplicationForms,
    getApplicationForm,
    createApplicationForm,
    updateApplicationForm,
    deleteApplicationForm
};