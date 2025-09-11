const informationSennovaService = require('../services/informationSennovaService');

const getAllInformationSennova = async (req, res) => {
    const allInformationSennova = await informationSennovaService.getAllInformationSennova();
    if (allInformationSennova)
        res.status(200).send({ status: "OK", data: allInformationSennova });
    else
        res.status(400).send({ status: "FAILED", data: allInformationSennova});
};

const getInformationSennova = async (req, res) => {
    let id = req.params.informationSennovaId;
    const informationSennova = await informationSennovaService.getInformationSennova(id);
    if(informationSennova)
        res.status(200).send({ status: "OK", data: informationSennova });
    else
       res.status(400).send({status: "FAILED", data: informationSennova});
    
};

const createInformationSennova = async (req, res) => {
    const { body } = req;
    const createdInformationSennova = await informationSennovaService.createInformationSennova(
        body.mision,
        body.vision,
        body.description,
        body.staff,
        body.lineSennova,
        body.ourServices,
        body.updateDate
    );
   if(createdInformationSennova)
        res.status(201).send({ status: "OK", data: createdInformationSennova });
    else
       res.status(400).send({status: "FAILED", data: createdInformationSennova});
};

const updateInformationSennova = async (req, res) => {
        let id = req.params.informationSennovaId;
        let { mision, vision, description, staff, lineSennova, ourServices, updateDate } = req.body;
        const updatedInformationSennova = await informationSennovaService.updateInformationSennova(
            id, mision, vision, description, staff, lineSennova, ourServices, updateDate
        );
        if (updatedInformationSennova)
        res.status(200).send({ status: "OK", data: updatedInformationSennova });
    else
      res.status(400).send({ status: "FAILED", data: updatedInformationSennova });
    };

const deleteInformationSennova = async (req, res) => {
    
        let id = req.params.informationSennovaId;
        const deletedInformationSennova = await informationSennovaService.deleteInformationSennova(id);
        if (deletedInformationSennova)
            res.status(200).send({ status: "OK", data: deletedInformationSennova });
        else
         res.status(400).send({ status: "FAILED", data: deletedInformationSennova });
};
module.exports = {
    getAllInformationSennova,
    getInformationSennova,
    createInformationSennova,
    updateInformationSennova,
    deleteInformationSennova
};