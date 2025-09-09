const typeFormService = require('../services/typeFormService');

const getAllTypeForms = async (req, res) => {
    const allTypeForms = await typeFormService.getAllTypeForms();
    if (allTypeForms)
        res.status(200).send({ status: "OK", data: allTypeForms });
    else
        res.status(400).send({ status: "FAILED", data: allTypeForms});
};

const getTypeForm = async (req, res) => {
    let id = req.params.typeFormId;
    const typeForm = await typeFormService.getTypeForm(id);
    if(typeForm)
        res.status(200).send({ status: "OK", data: typeForm });
    else
       res.status(400).send({status: "FAILED", data: typeForm});
    
};

const createTypeForm = async (req, res) => {
    const { body } = req;
    const createdTypeForm = await typeFormService.createTypeForm(
        body.description, 
        body.fkIdLinesSennova
    );
   if(createdTypeForm)
        res.status(201).send({ status: "OK", data: createdTypeForm });
    else
       res.status(400).send({status: "FAILED", data: createdTypeForm});
};

const updateTypeForm = async (req, res) => {
        let id = req.params.typeFormId;
        let { description, fkIdLinesSennova } = req.body;
        const updatedTypeForm = await typeFormService.updateTypeForm(
            id, description, fkIdLinesSennova
        );
        if (updatedTypeForm)
        res.status(200).send({ status: "OK", data: updatedTypeForm });
    else
      res.status(400).send({ status: "FAILED", data: updatedTypeForm });
    };

const deleteTypeForm = async (req, res) => {
    
        let id = req.params.typeFormId;
        const deletedTypeForm = await typeFormService.deleteTypeForm(id);
        if (deletedTypeForm)
            res.status(200).send({ status: "OK", data: deletedTypeForm });
        else
         res.status(400).send({ status: "FAILED", data: deletedTypeForm });
};
module.exports = {
    getAllTypeForms,
    getTypeForm,
    createTypeForm,
    updateTypeForm,
    deleteTypeForm
};