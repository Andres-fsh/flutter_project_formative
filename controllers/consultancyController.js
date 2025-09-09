const consultancyService = require('../services/consultancyService');

const getAllConsultancies = async (req, res) => {
    const allConsultancies = await consultancyService.getAllConsultancies();
   if (allConsultancies)
        res.status(200).send({ status: "OK", data: allConsultancies });
   else
          res.status(400).send({ status: "FAILED", data: allConsultancies});
};

const getConsultancy = async (req, res) => {
    let id = req.params.consultancyId;
    const consultancy = await consultancyService.getConsultancy(id);
    if(consultancy)
        res.status(200).send({ status: "OK", data: consultancy });
    else
       res.status(400).send({status: "FAILED", data: consultancy});
    
};

const createConsultancy = async (req, res) => {
    const { body } = req;
    const createdConsultancy = await consultancyService.createConsultancy(
        body.date, 
        body.state, 
        body.description, 
        body.fkIdUsers
    );
   if(createdConsultancy)
        res.status(201).send({ status: "OK", data: createdConsultancy });
    else
       res.status(400).send({status: "FAILED", data: createdConsultancy});
};

const updateConsultancy = async (req, res) => {
        let id = req.params.consultancyId;
        let { date, state, description, fkIdUsers } = req.body;
        const updatedConsultancy = await consultancyService.updateConsultancy(
            id, date, state, description, fkIdUsers
        );
        if (updatedConsultancy)
        res.status(200).send({ status: "OK", data: updatedConsultancy });
    else
      res.status(400).send({ status: "FAILED", data: updatedConsultancy });
    };

const deleteConsultancy = async (req, res) => {
    
        let id = req.params.consultancyId;
        const deletedConsultancy = await consultancyService.deleteConsultancy(id);
        if (deletedConsultancy)
            res.status(200).send({ status: "OK", data: deletedConsultancy });
        else
         res.status(400).send({ status: "FAILED", data: deletedConsultancy });
};
module.exports = {
    getAllConsultancies,
    getConsultancy,
    createConsultancy,
    updateConsultancy,
    deleteConsultancy
};