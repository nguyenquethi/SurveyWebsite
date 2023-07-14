let mongoose = require('mongoose');

// create a model class
let Survey = mongoose.Schema({
   active:String,
   respondents:Number,
   username:String,
   displayName:String,
   surveyOwner:String,
    surveyName:String, 
    surveyDescription:String,
    createdDate:String,  
    startDate:String,
    endDate:String,
   modifiedDate:String,
    url: String,
    Questionnaire_type:String,
    Question1:String,
    Question2:String,
    Question3:String,
    Question4:String,
    Question5:String,
    Questionlength:Number,
    Questionlengthtf:Number,
    Question1AnswerLength:Number,    
    Question2AnswerLength:Number,
    Question3AnswerLength:Number,
    Question4AnswerLength:Number,
    Question5AnswerLength:Number,
    Question1Answer1:String,
    Question1Answer2:String,
    Question1Answer3:String,
    Question1Answer4:String,
    Question1Answer5:String,
    Question2Answer1:String,
    Question2Answer2:String,
    Question2Answer3:String,
    Question2Answer4:String,
    Question2Answer5:String,
    Question3Answer1:String,
    Question3Answer2:String,
    Question3Answer3:String,
    Question3Answer4:String,
    Question3Answer5:String,
    Question4Answer1:String,
    Question4Answer2:String,
    Question4Answer3:String,
    Question4Answer4:String,
    Question4Answer5:String,
    Question5Answer1:String,
    Question5Answer2:String,
    Question5Answer3:String,
    Question5Answer4:String,
    Question5Answer5:String,

    questions:[	
        {
           questionNumber:Number,
           questionDetail:String,
           questionFormat: String
             
        } 
     ]
 
},
{
  collection: "Survey"
});

module.exports = mongoose.model('Survey', Survey);
