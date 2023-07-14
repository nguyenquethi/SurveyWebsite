let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the survey model
let survey = require('../models/survey');

let surveyController= require('../controllers/surveys');


let takesurvey = require('../models/takeasurvey');

//let takesurveyController= require('../controllers/surveys');

//helper function for authentification, to guard process
function requireAuth(req,res,next)
{
  if(!req.isAuthenticated())
  {
    return res.redirect('/login');
  }
 
    next();
 
}

router.get('/createcsv/:id',surveyController.createCsv);

router.get('/createxl/:id',surveyController.createExcel);
router.get('/thanks',(req, res, err) => {

  
   
       res.render('surveys/thanks',{
           title:'Thanks for Participating', displayName: req.user ? req.user.displayName: ''
       });
   
  
 
  }
);

router.get('/takeasurvey',surveyController.displaySurveyListForTakeASurvey );


router.get('/takeasurvey/:id',surveyController.takeASurvey );

router.post('/takeasurvey/:id',surveyController.takeAsurveyAndPost );


//router.post('/takeasurvey/:id',requireAuth,surveyController.takeAsurveyAndPost);



////////////////////////////////////////////////

router.get('/',surveyController.displaySurveyList );

router.get('/add',requireAuth,surveyController.displayCreateSurveyPage );

router.post('/add',surveyController.createSurvey);

router.post('/finalcreate',surveyController.finalCreate);


// GET the Survey Details page in order to edit an existing Book

router.get('/surveyview/:id',requireAuth,surveyController.createSurveyToView);

router.get('/:id',requireAuth,surveyController.createSurveyToEdit);

router.get('/statistics/:id',requireAuth,surveyController.statistics);

// POST - process the information passed from the details form and update existing survey
router.post('/:id',requireAuth,surveyController.updateSurvey);

//router.get('/createfile',surveyController.createFile);





 


// GET - process the delete by user id
router.get('/delete/:id',requireAuth, surveyController.deleteSurvey );








  
  module.exports = router;