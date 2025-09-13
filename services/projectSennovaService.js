const db = require('../models');

const getAllProjectsSennova = async () => {
    try {
        let projectsSennova = await db.ProjectSennova.findAll({
            include: [
                {
                    model: db.Consultancies,
                    as: 'consultancy',
                    attributes: ['id', 'date', 'state', 'description', 'fkIdUsers']
                },
                {
                    model: db.LinesSennova,
                    as: 'lineSennova',
                    attributes: ['id', 'name', 'description', 'fkIdUsers']
                }
            ]
        });
        return projectsSennova;
    } catch (error) {
        return error.message || "Failed to get projects sennova";
    }
};

const getProjectSennova = async (id) => {
    try {
        let projectSennova = await db.ProjectSennova.findByPk(id, {
            include: [
                {
                    model: db.Consultancies,
                    as: 'consultancy',
                    attributes: ['id', 'date', 'state', 'description', 'fkIdUsers']
                },
                {
                    model: db.LinesSennova,
                    as: 'lineSennova',
                    attributes: ['id', 'name', 'description', 'fkIdUsers']
                }
            ]
        });
    
        return projectSennova;
    } catch (error) {
        return error.message || "Failed to get project sennova";
    }
};

const createProjectSennova = async (name, description, startDate, endDate, fkIdConsultancies, fkIdLinesSennova) => {
    try {
        let newProjectSennova = await db.ProjectSennova.create({
            name,
            description,
            startDate,
            endDate,
            fkIdConsultancies,
            fkIdLinesSennova
        });
        return newProjectSennova;
    } catch (error) {
        return error.message || "Project sennova could not be created";
    }
};

const updateProjectSennova = async (id, name, description, startDate, endDate, fkIdConsultancies, fkIdLinesSennova) => {
    try {
        let updatedProjectSennova = await db.ProjectSennova.update({
            name,
            description,
            startDate,
            endDate,
            fkIdConsultancies,
            fkIdLinesSennova
        }, {
            where: { id }
        });
        return updatedProjectSennova;
    } catch (error) {
        return error.message || "Project sennova could not be updated";
    }
};

const deleteProjectSennova = async (id) => {
    try {
        const deletedProjectSennova = await db.ProjectSennova.destroy({
            where: { id }
        });
        return deletedProjectSennova;
    } catch (error) {
        return error.message || "Project sennova could not be deleted";
    }
};

module.exports = {
    getAllProjectsSennova,
    getProjectSennova,
    createProjectSennova,
    updateProjectSennova,
    deleteProjectSennova
};