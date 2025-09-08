const consultancyService = require('../services/consultancyService');

const getAllConsultancies = async (req, res) => {
    try {
        const allConsultancies = await consultancyService.getAllConsultancies();
        res.status(200).send({ status: "OK", data: allConsultancies });
    } catch (error) {
        res.status(400).send({ status: "FAILED", data: { error: error.message } });
    }
};

const getConsultancy = async (req, res) => {
    try {
        let id = req.params.consultancyId;
        const consultancy = await consultancyService.getConsultancy(id);
        res.status(200).send({ status: "OK", data: consultancy });
    } catch (error) {
        res.status(error.status || 500).send({ status: "FAILED", data: { error: error.message } });
    }
};

const createConsultancy = async (req, res) => {
    try {
        const { body } = req;
        const createdConsultancy = await consultancyService.createConsultancy(
            body.date, 
            body.state, 
            body.description, 
            body.fkIdUsers
        );
        res.status(201).send({ status: "OK", data: createdConsultancy });
    } catch (error) {
        res.status(400).send({ status: "FAILED", data: { error: error.message } });
    }
};

const updateConsultancy = async (req, res) => {
    try {
        let id = req.params.consultancyId;
        let { date, state, description, fkIdUsers } = req.body;
        const updatedConsultancy = await consultancyService.updateConsultancy(
            id, date, state, description, fkIdUsers
        );
        res.status(200).send({ status: "OK", data: updatedConsultancy });
    } catch (error) {
        res.status(400).send({ status: "FAILED", data: { error: error.message } });
    }
};

const deleteConsultancy = async (req, res) => {
    try {
        let id = req.params.consultancyId;
        const deletedConsultancy = await consultancyService.deleteConsultancy(id);
        res.status(200).send({ status: "OK", data: deletedConsultancy });
    } catch (error) {
        res.status(400).send({ status: "FAILED", data: { error: error.message } });
    }
};

module.exports = {
    getAllConsultancies,
    getConsultancy,
    createConsultancy,
    updateConsultancy,
    deleteConsultancy
};