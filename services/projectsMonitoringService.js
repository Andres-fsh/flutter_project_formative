const db = require('../models');

const getAllProjectsMonitoring = async () => {
    try {
        let projectsMonitoring = await db.ProjectsMonitoring.findAll({
            include: [
                {
                    model: db.Users,
                    as: 'user',
                    attributes: ['id', 'userName', 'name', 'lastName', 'email']
                },
                {
                    model: db.ProjectSennova,
                    as: 'projectSennova',
                    attributes: ['id', 'name', 'description', 'startDate', 'endDate']
                }
            ]
        });
        return projectsMonitoring;
    } catch (error) {
        return error.message || "Failed to get projects monitoring";
    }
};

const getProjectsMonitoring = async (id) => {
    try {
        let projectsMonitoring = await db.ProjectsMonitoring.findByPk(id, {
            include: [
                {
                    model: db.Users,
                    as: 'user',
                    attributes: ['id', 'userName', 'name', 'lastName', 'email']
                },
                {
                    model: db.ProjectSennova,
                    as: 'projectSennova',
                    attributes: ['id', 'name', 'description', 'startDate', 'endDate']
                }
            ]
        });
    
        return projectsMonitoring;
    } catch (error) {
        return error.message || "Failed to get projects monitoring";
    }
};

const createProjectsMonitoring = async (phase, state, description, registrationDate, fkIdUsers, fkIdProjectSennova) => {
    try {
        let newProjectsMonitoring = await db.ProjectsMonitoring.create({
            phase,
            state,
            description,
            registrationDate,
            fkIdUsers,
            fkIdProjectSennova
        });
        return newProjectsMonitoring;
    } catch (error) {
        return error.message || "Projects monitoring could not be created";
    }
};

const updateProjectsMonitoring = async (id, phase, state, description, registrationDate, fkIdUsers, fkIdProjectSennova) => {
    try {
        let updatedProjectsMonitoring = await db.ProjectsMonitoring.update({
            phase,
            state,
            description,
            registrationDate,
            fkIdUsers,
            fkIdProjectSennova
        }, {
            where: { id }
        });
        return updatedProjectsMonitoring;
    } catch (error) {
        return error.message || "Projects monitoring could not be updated";
    }
};

const deleteProjectsMonitoring = async (id) => {
    try {
        const deletedProjectsMonitoring = await db.ProjectsMonitoring.destroy({
            where: { id }
        });
        return deletedProjectsMonitoring;
    } catch (error) {
        return error.message || "Projects monitoring could not be deleted";
    }
};

module.exports = {
    getAllProjectsMonitoring,
    getProjectsMonitoring,
    createProjectsMonitoring,
    updateProjectsMonitoring,
    deleteProjectsMonitoring
};