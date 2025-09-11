const applicationFormService = require('../services/applicationFormService');

const getAllApplicationForms = async (req, res) => {
    const allApplicationForms = await applicationFormService.getAllApplicationForms();
    if (allApplicationForms)
        res.status(200).send({ status: "OK", data: allApplicationForms });
    else
        res.status(400).send({ status: "FAILED", data: allApplicationForms});
};

const getApplicationForm = async (req, res) => {
    let id = req.params.applicationFormId;
    const applicationForm = await applicationFormService.getApplicationForm(id);
    if(applicationForm)
        res.status(200).send({ status: "OK", data: applicationForm });
    else
       res.status(400).send({status: "FAILED", data: applicationForm});
    
};

const createApplicationForm = async (req, res) => {
    const { body } = req;
    const createdApplicationForm = await applicationFormService.createApplicationForm(
        body.userType,
        body.name,
        body.identificationType,
        body.email,
        body.phone,
        body.companyName,
        body.description,
        body.fkIdTypeForms
    );
   if(createdApplicationForm)
        res.status(201).send({ status: "OK", data: createdApplicationForm });
    else
       res.status(400).send({status: "FAILED", data: createdApplicationForm});
};

const updateApplicationForm = async (req, res) => {
        let id = req.params.applicationFormId;
        let { userType, name, identificationType, email, phone, companyName, description, fkIdTypeForms } = req.body;
        const updatedApplicationForm = await applicationFormService.updateApplicationForm(
            id, userType, name, identificationType, email, phone, companyName, description, fkIdTypeForms
        );
        if (updatedApplicationForm)
        res.status(200).send({ status: "OK", data: updatedApplicationForm });
    else
      res.status(400).send({ status: "FAILED", data: updatedApplicationForm });
    };

const deleteApplicationForm = async (req, res) => {
    
        let id = req.params.applicationFormId;
        const deletedApplicationForm = await applicationFormService.deleteApplicationForm(id);
        if (deletedApplicationForm)
            res.status(200).send({ status: "OK", data: deletedApplicationForm });
        else
         res.status(400).send({ status: "FAILED", data: deletedApplicationForm });
};
module.exports = {
    getAllApplicationForms,
    getApplicationForm,
    createApplicationForm,
    updateApplicationForm,
    deleteApplicationForm
};