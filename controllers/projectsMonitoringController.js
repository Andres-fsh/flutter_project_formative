const projectsMonitoringService = require('../services/projectsMonitoringService');

const getAllProjectsMonitorings = async (req, res) => {
    const allProjectsMonitorings = await projectsMonitoringService.getAllProjectsMonitorings();
    if (allProjectsMonitorings)
        res.status(200).send({ status: "OK", data: allProjectsMonitorings });
    else
        res.status(400).send({ status: "FAILED", data: allProjectsMonitorings});
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
module.exports = {
    getAllProjectsMonitorings,
    getProjectsMonitoring,
    createProjectsMonitoring,
    updateProjectsMonitoring,
    deleteProjectsMonitoring
};