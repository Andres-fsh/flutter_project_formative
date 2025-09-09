const lineSennovaService = require('../services/lineSennovaService');

const getAllLinesSennova = async (req, res) => {
    const allLinesSennova = await lineSennovaService.getAllLinesSennova();
    if (allLinesSennova)
        res.status(200).send({ status: "OK", data: allLinesSennova });
    else
        res.status(400).send({ status: "FAILED", data: allLinesSennova});
};

const getLineSennova = async (req, res) => {
    let id = req.params.lineSennovaId;
    const lineSennova = await lineSennovaService.getLineSennova(id);
    if(lineSennova)
        res.status(200).send({ status: "OK", data: lineSennova });
    else
       res.status(400).send({status: "FAILED", data: lineSennova});
    
};

const createLineSennova = async (req, res) => {
    const { body } = req;
    const createdLineSennova = await lineSennovaService.createLineSennova(
        body.name, 
        body.description, 
        body.fkIdUsers
    );
   if(createdLineSennova)
        res.status(201).send({ status: "OK", data: createdLineSennova });
    else
       res.status(400).send({status: "FAILED", data: createdLineSennova});
};

const updateLineSennova = async (req, res) => {
        let id = req.params.lineSennovaId;
        let { name, description, fkIdUsers } = req.body;
        const updatedLineSennova = await lineSennovaService.updateLineSennova(
            id, name, description, fkIdUsers
        );
        if (updatedLineSennova)
        res.status(200).send({ status: "OK", data: updatedLineSennova });
    else
      res.status(400).send({ status: "FAILED", data: updatedLineSennova });
    };

const deleteLineSennova = async (req, res) => {
    
        let id = req.params.lineSennovaId;
        const deletedLineSennova = await lineSennovaService.deleteLineSennova(id);
        if (deletedLineSennova)
            res.status(200).send({ status: "OK", data: deletedLineSennova });
        else
         res.status(400).send({ status: "FAILED", data: deletedLineSennova });
};
module.exports = {
    getAllLinesSennova,
    getLineSennova,
    createLineSennova,
    updateLineSennova,
    deleteLineSennova
};