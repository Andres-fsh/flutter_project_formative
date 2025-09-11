const db = require('../models');

const getAllSatisfactionSurveys = async () => {
    try {
        let satisfactionSurveys = await db.SatisfactionSurvey.findAll({
            include: [{
                model: db.TypeForms,
                as: 'typeForm',
                attributes: ['id', 'description']
            }]
        });
        return satisfactionSurveys;
    } catch (error) {
        return error.message || "Failed to get satisfaction surveys";
    }
};

const getSatisfactionSurvey = async (id) => {
    try {
        let satisfactionSurvey = await db.SatisfactionSurvey.findByPk(id, {
            include: [{
                model: db.TypeForms,
                as: 'typeForm',
                attributes: ['id', 'description']
            }]
        });
    
        return satisfactionSurvey;
    } catch (error) {
        return error.message || "Failed to get satisfaction survey";
    }
};

const createSatisfactionSurvey = async (surveyOne, surveyTwo, surveyThree, surveyFour, surveyFive, surveySix, surveySeven, surveyEight, observations, fkIdTypeForms) => {
    try {
        let newSatisfactionSurvey = await db.SatisfactionSurvey.create({
            surveyOne,
            surveyTwo,
            surveyThree,
            surveyFour,
            surveyFive,
            surveySix,
            surveySeven,
            surveyEight,
            observations,
            fkIdTypeForms
        });
        return newSatisfactionSurvey;
    } catch (error) {
        return error.message || "Satisfaction survey could not be created";
    }
};

const updateSatisfactionSurvey = async (id, surveyOne, surveyTwo, surveyThree, surveyFour, surveyFive, surveySix, surveySeven, surveyEight, observations, fkIdTypeForms) => {
    try {
        let updatedSatisfactionSurvey = await db.SatisfactionSurvey.update({
            surveyOne,
            surveyTwo,
            surveyThree,
            surveyFour,
            surveyFive,
            surveySix,
            surveySeven,
            surveyEight,
            observations,
            fkIdTypeForms
        }, {
            where: { id }
        });
        return updatedSatisfactionSurvey;
    } catch (error) {
        return error.message || "Satisfaction survey could not be updated";
    }
};

const deleteSatisfactionSurvey = async (id) => {
    try {
        const deletedSatisfactionSurvey = await db.SatisfactionSurvey.destroy({
            where: { id }
        });
        return deletedSatisfactionSurvey;
    } catch (error) {
        return error.message || "Satisfaction survey could not be deleted";
    }
};

module.exports = {
    getAllSatisfactionSurveys,
    getSatisfactionSurvey,
    createSatisfactionSurvey,
    updateSatisfactionSurvey,
    deleteSatisfactionSurvey
};