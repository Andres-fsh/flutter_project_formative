const projectSennovaService = require('../services/projectSennovaService');

const getAllProjectSennovas = async (req, res) => {
    const allProjectSennovas = await projectSennovaService.getAllProjectSennovas();
    if (allProjectSennovas)
        res.status(200).send({ status: "OK", data: allProjectSennovas });
    else
        res.status(400).send({ status: "FAILED", data: allProjectSennovas});
};

const getProjectSennova = async (req, res) => {
    let id = req.params.projectSennovaId;
    const projectSennova = await projectSennovaService.getProjectSennova(id);
    if(projectSennova)
        res.status(200).send({ status: "OK", data: projectSennova });
    else
       res.status(400).send({status: "FAILED", data: projectSennova});
    
};

const createProjectSennova = async (req, res) => {
    const { body } = req;
    const createdProjectSennova = await projectSennovaService.createProjectSennova(
        body.name,
        body.description,
        body.startDate,
        body.endDate,
        body.fkIdConsultancies,
        body.fkIdLinesSennova
    );
   if(createdProjectSennova)
        res.status(201).send({ status: "OK", data: createdProjectSennova });
    else
       res.status(400).send({status: "FAILED", data: createdProjectSennova});
};

const updateProjectSennova = async (req, res) => {
        let id = req.params.projectSennovaId;
        let { name, description, startDate, endDate, fkIdConsultancies, fkIdLinesSennova } = req.body;
        const updatedProjectSennova = await projectSennovaService.updateProjectSennova(
            id, name, description, startDate, endDate, fkIdConsultancies, fkIdLinesSennova
        );
        if (updatedProjectSennova)
        res.status(200).send({ status: "OK", data: updatedProjectSennova });
    else
      res.status(400).send({ status: "FAILED", data: updatedProjectSennova });
    };

const deleteProjectSennova = async (req, res) => {
    
        let id = req.params.projectSennovaId;
        const deletedProjectSennova = await projectSennovaService.deleteProjectSennova(id);
        if (deletedProjectSennova)
            res.status(200).send({ status: "OK", data: deletedProjectSennova });
        else
         res.status(400).send({ status: "FAILED", data: deletedProjectSennova });
};
module.exports = {
    getAllProjectSennovas,
    getProjectSennova,
    createProjectSennova,
    updateProjectSennova,
    deleteProjectSennova
};