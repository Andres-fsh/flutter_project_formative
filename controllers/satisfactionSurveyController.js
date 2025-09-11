const satisfactionSurveyService = require('../services/satisfactionSurveyService');

const getAllSatisfactionSurveys = async (req, res) => {
    const allSatisfactionSurveys = await satisfactionSurveyService.getAllSatisfactionSurveys();
    if (allSatisfactionSurveys)
        res.status(200).send({ status: "OK", data: allSatisfactionSurveys });
    else
        res.status(400).send({ status: "FAILED", data: allSatisfactionSurveys});
};

const getSatisfactionSurvey = async (req, res) => {
    let id = req.params.satisfactionSurveyId;
    const satisfactionSurvey = await satisfactionSurveyService.getSatisfactionSurvey(id);
    if(satisfactionSurvey)
        res.status(200).send({ status: "OK", data: satisfactionSurvey });
    else
       res.status(400).send({status: "FAILED", data: satisfactionSurvey});
    
};

const createSatisfactionSurvey = async (req, res) => {
    const { body } = req;
    const createdSatisfactionSurvey = await satisfactionSurveyService.createSatisfactionSurvey(
        body.surveyOne,
        body.surveyTwo,
        body.surveyThree,
        body.surveyFour,
        body.surveyFive,
        body.surveySix,
        body.surveySeven,
        body.surveyEight,
        body.observations,
        body.fkIdTypeForms
    );
   if(createdSatisfactionSurvey)
        res.status(201).send({ status: "OK", data: createdSatisfactionSurvey });
    else
       res.status(400).send({status: "FAILED", data: createdSatisfactionSurvey});
};

const updateSatisfactionSurvey = async (req, res) => {
        let id = req.params.satisfactionSurveyId;
        let { surveyOne, surveyTwo, surveyThree, surveyFour, surveyFive, surveySix, surveySeven, surveyEight, observations, fkIdTypeForms } = req.body;
        const updatedSatisfactionSurvey = await satisfactionSurveyService.updateSatisfactionSurvey(
            id, surveyOne, surveyTwo, surveyThree, surveyFour, surveyFive, surveySix, surveySeven, surveyEight, observations, fkIdTypeForms
        );
        if (updatedSatisfactionSurvey)
        res.status(200).send({ status: "OK", data: updatedSatisfactionSurvey });
    else
      res.status(400).send({ status: "FAILED", data: updatedSatisfactionSurvey });
    };

const deleteSatisfactionSurvey = async (req, res) => {
    
        let id = req.params.satisfactionSurveyId;
        const deletedSatisfactionSurvey = await satisfactionSurveyService.deleteSatisfactionSurvey(id);
        if (deletedSatisfactionSurvey)
            res.status(200).send({ status: "OK", data: deletedSatisfactionSurvey });
        else
         res.status(400).send({ status: "FAILED", data: deletedSatisfactionSurvey });
};
module.exports = {
    getAllSatisfactionSurveys,
    getSatisfactionSurvey,
    createSatisfactionSurvey,
    updateSatisfactionSurvey,
    deleteSatisfactionSurvey
};