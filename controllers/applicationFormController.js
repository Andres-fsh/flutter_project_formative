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
  try {
    const { body } = req;
    
    const cleanPhone = body.phone ? String(body.phone).replace(/\D/g, '') : null;

    const createdApplicationForm = await applicationFormService.createApplicationForm(
      body.userType,
      body.name,
      body.identificationType,
      body.email,
      cleanPhone, 
      body.companyName,
      body.description,
      body.fkIdTypeForms
    );
    
    if(createdApplicationForm)
      res.status(201).send({ status: "OK", data: createdApplicationForm });
    else
      res.status(400).send({status: "FAILED", data: createdApplicationForm});
  } catch (error) {
    res.status(400).send({status: "FAILED", data: { error: error.message }});
  }
};

const updateApplicationForm = async (req, res) => {
  try {
    let id = req.params.applicationFormId;
    let { userType, name, identificationType, email, phone, companyName, description, fkIdTypeForms } = req.body;
    
    
    const cleanPhone = phone ? String(phone).replace(/\D/g, '') : null;

    const updatedApplicationForm = await applicationFormService.updateApplicationForm(
      id, userType, name, identificationType, email, cleanPhone, companyName, description, fkIdTypeForms
    );
    
    if (updatedApplicationForm)
      res.status(200).send({ status: "OK", data: updatedApplicationForm });
    else
      res.status(400).send({ status: "FAILED", data: updatedApplicationForm });
  } catch (error) {
    res.status(400).send({ status: "FAILED", data: { error: error.message }});
  }
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