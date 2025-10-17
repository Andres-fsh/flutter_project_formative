const projectsMonitoringService = require('../services/projectsMonitoringService');

const getAllProjectsMonitoring = async (req, res) => {
    const allProjectsMonitoring = await projectsMonitoringService.getAllProjectsMonitoring();
    if (allProjectsMonitoring)
        res.status(200).send({ status: "OK", data: allProjectsMonitoring });
    else
        res.status(400).send({ status: "FAILED", data: allProjectsMonitoring});
};

const getProjectsMonitoring = async (req, res) => {
    let id = req.params.projectsMonitoringId;
    const projectsMonitoring = await projectsMonitoringService.getProjectsMonitoring(id);
    if(projectsMonitoring)
        res.status(200).send({ status: "OK", data: projectsMonitoring });
    else
       res.status(400).send({status: "FAILED", data: projectsMonitoring});
    
};

const createProjectsMonitoring = async (req, res) => {
    const { body } = req;
    const createdProjectsMonitoring = await projectsMonitoringService.createProjectsMonitoring(
        body.phase, 
        body.state, 
        body.description, 
        body.registrationDate, 
        body.fkIdUsers, 
        body.fkIdProjectSennova
    );
   if(createdProjectsMonitoring)
        res.status(201).send({ status: "OK", data: createdProjectsMonitoring });
    else
       res.status(400).send({status: "FAILED", data: createdProjectsMonitoring});
};

const updateProjectsMonitoring = async (req, res) => {
        let id = req.params.projectsMonitoringId;
        let { phase, state, description, registrationDate, fkIdUsers, fkIdProjectSennova } = req.body;
        const updatedProjectsMonitoring = await projectsMonitoringService.updateProjectsMonitoring(
            id, phase, state, description, registrationDate, fkIdUsers, fkIdProjectSennova
        );
        if (updatedProjectsMonitoring)
        res.status(200).send({ status: "OK", data: updatedProjectsMonitoring });
    else
      res.status(400).send({ status: "FAILED", data: updatedProjectsMonitoring });
    };

const deleteProjectsMonitoring = async (req, res) => {
    
        let id = req.params.projectsMonitoringId;
        const deletedProjectsMonitoring = await projectsMonitoringService.deleteProjectsMonitoring(id);
        if (deletedProjectsMonitoring)
            res.status(200).send({ status: "OK", data: deletedProjectsMonitoring });
        else
         res.status(400).send({ status: "FAILED", data: deletedProjectsMonitoring });
};

const getProjectsMonitoringByUserId = async (req, res) => {
    try {
        let userId = req.params.userId;
        
        let projectsMonitoring = await db.ProjectsMonitoring.findAll({
            where: { fkIdUsers: userId },
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
        
        if (projectsMonitoring && projectsMonitoring.length > 0) {
            res.status(200).send({ status: "OK", data: projectsMonitoring[0] });
        } else {
            res.status(404).send({ status: "NOT_FOUND", message: "No se encontró proyecto para este usuario" });
        }
    } catch (error) {
        console.error('Error en getProjectsMonitoringByUserId:', error);
        res.status(500).send({ status: "ERROR", message: error.message });
    }
};
module.exports = {
    getAllProjectsMonitoring,
    getProjectsMonitoring,
    createProjectsMonitoring,
    updateProjectsMonitoring,
    deleteProjectsMonitoring,
    getProjectsMonitoringByUserId 
};