let express = require('express');

let mongoose = require('mongoose');

let survey = require('../models/survey');

let takeasurvey = require('../models/takeasurvey');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');
const os = require('os');
const convertCsvToXlsx = require('@aternus/csv-to-xlsx');


module.exports.createCsv= async (req, res, next) => {


  let id=req.params.id;




  let results= await takeasurvey.find({'surveyId' :id }); // takesurvery results
 console.log(results); // survay taken results

 let questionLength= results[0].Questionlength; //sample question length
 
 console.log(questionLength);

 let resultsLength=results.length; //length of results

 console.log(resultsLength); //how many surveys taken

 let originalSurvey= await survey.findById(id); // sample of original survey
 console.log(originalSurvey);  //original survey schema

 var questionList=new Array();//Create Array

  for(x=0;x<questionLength;x++)
  {

 questionList.push(originalSurvey['Question'+`${x+1}`]);
  }


  console.log(questionList) //Array containing questions

  ///find questions length, find array for all answers

  //Question1AnswerLength

  let answerLengthList= new Array();

  for(x=0;x<questionLength;x++)
  {

    answerLengthList.push(originalSurvey['Question'+`${x+1}`+"AnswerLength"]);
  }


  console.log(answerLengthList);
 
/*
  let question1answers= new Array();
  let question2answers= new Array();
  let question3answers= new Array();
  let question4answers= new Array();
  let question5answers= new Array();
  */

 
  ///////////////////////////////////////
  let answeroptions= [];

  for(x=0;x<questionLength;x++)
  {
    answeroptions['Question'+`${x+1}`]=[];
    for(y=0;y<answerLengthList[x];y++){
   //originalSurvey['Question'+`${x+1}`+'Answer'+`${x+1}`]

    answeroptions['Question'+`${x+1}`].push( originalSurvey['Question'+`${x+1}`+'Answer'+`${y+1}`])

  }
  }

  console.log(answeroptions); // available options to each question


  /////////////////////////////
  //Question1Answer

  results
  resultsLength

  let useranswers=[];

  for(x=0;x<questionLength;x++)
  {
    //useranswers.push( results[x]['Question'+`${x+1}`+'Answer']);
    
    useranswers['Question'+`${x+1}`]=[];
   
    for(y=0;y<resultsLength;y++){ 
     // useranswers.push( results[y]['Question'+`${x+1}`+'Answer'], results[x]['Question'+`${x+1}`+'Answer']);
     
      useranswers['Question'+`${x+1}`].push( results[y]['Question'+`${x+1}`+'Answer']);
    }
  }


  console.log(useranswers); // answers given by responsents


  // console.log(answeroptions);

  //  console.log(useranswers);
 


  let answeredratio=[];

  for(x=0;x<answerLengthList.length;x++)
  {
   // answeroptions[x] 
   answeredratio['Question'+`${x+1}`]=[];

   answeroptions['Question'+`${x+1}`].forEach(function (option) {
    //count through user answers
    var cnt=0;
    var rep=0;
    while(cnt<useranswers['Question'+`${x+1}`].length){
        if(option ===useranswers['Question'+`${x+1}`][cnt] )
        {

          rep++;
         
        }
    cnt++;
    }
    answeredratio['Question'+`${x+1}`].push(option,rep);
});
    
  }

  console.log(answeredratio);  // ration of opinion available to selected per question

  //questionList
  //answeredratio

  //originalSurvey

  for(x=0;x<questionList.length;x++)
  {
  console.log(questionList[x]+" ::");
      for(y=0;y<answeredratio['Question'+`${x+1}`].length;y++){
        console.log(answeredratio['Question'+`${x+1}`][y]+" was answered by " +answeredratio['Question'+`${x+1}`][y+1]+" People");
        y=y+1;

  }


  }
///////////////////////////////////////////////////////////////

 let filename=path.join(__dirname, 'Filename.csv');
const csvWriter = createCsvWriter({
    path:filename,
    header: [
        {id: 'opinion', title: 'opinion'},
        {id: 'userresponse', title: 'userresponse'}
    ]
});
let records=[];

for(x=0;x<questionList.length;x++)
{
 
  records.push({opinion:questionList[x],userresponse:'      '});
    for(y=0;y<answeredratio['Question'+`${x+1}`].length;y++){
      records.push( 
        // answeredratio['Question'+`${x+1}`][y]+" was answered by " +answeredratio['Question'+`${x+1}`][y+1]+" People"
           {opinion: answeredratio['Question'+`${x+1}`][y],  userresponse: answeredratio['Question'+`${x+1}`][y+1]},
        )
        y=y+1;
}


}


 
  
 
 
 
await csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
    });


  await res.setHeader('Content-Type', 'text/csv'); 
   
   await res.sendFile((filename), function (err) {
    if (err) throw err;
    // if no error, file has been deleted successfully
   
    fs.unlink(filename, (err) => {
      if (err) {
          throw err;
      }
  
      console.log("File is deleted.");
  });
});

  // await fs.unlinkSync(filename);
 

  /*

  const filename = path.join(__dirname, 'Filename.xlsx');
  var jsn = [{
    "name": "Nilesh",
    "school": "RDTC",
    "marks": "77"
   },{
    "name": "Sagar",
    "school": "RC",
    "marks": "99.99"
   },{
    "name": "Prashant",
    "school": "Solapur",
    "marks": "100"
 }];

var data='';
 
for (var i = 0; i < jsn.length; i++) {
    data=data+jsn[i].name+'\t'+jsn[i].school+'\t'+jsn[i].marks+'\n';
 }
fs.appendFile(filename, data, (err) => {
    if (err) throw err;
    console.log('File created');
 });
  
 
  
 
res.sendFile(filename, function (err) {
    if (err) {
        next(err);
    } else {
        console.log('Sent:', filename);
    }
});
*/

}



module.exports.createExcel= async (req, res, next) => {


  let id=req.params.id;




  let results= await takeasurvey.find({'surveyId' :id }); // takesurvery results
 console.log(results); // survay taken results

 let questionLength= results[0].Questionlength; //sample question length
 
 console.log(questionLength);

 let resultsLength=results.length; //length of results

 console.log(resultsLength); //how many surveys taken

 let originalSurvey= await survey.findById(id); // sample of original survey
 console.log(originalSurvey);  //original survey schema

 var questionList=new Array();//Create Array

  for(x=0;x<questionLength;x++)
  {

 questionList.push(originalSurvey['Question'+`${x+1}`]);
  }


  console.log(questionList) //Array containing questions

  ///find questions length, find array for all answers

  //Question1AnswerLength

  let answerLengthList= new Array();

  for(x=0;x<questionLength;x++)
  {

    answerLengthList.push(originalSurvey['Question'+`${x+1}`+"AnswerLength"]);
  }


  console.log(answerLengthList);
 
/*
  let question1answers= new Array();
  let question2answers= new Array();
  let question3answers= new Array();
  let question4answers= new Array();
  let question5answers= new Array();
  */

 
  ///////////////////////////////////////
  let answeroptions= [];

  for(x=0;x<questionLength;x++)
  {
    answeroptions['Question'+`${x+1}`]=[];
    for(y=0;y<answerLengthList[x];y++){
   //originalSurvey['Question'+`${x+1}`+'Answer'+`${x+1}`]

    answeroptions['Question'+`${x+1}`].push( originalSurvey['Question'+`${x+1}`+'Answer'+`${y+1}`])

  }
  }

  console.log(answeroptions); // available options to each question


  /////////////////////////////
  //Question1Answer

  results
  resultsLength

  let useranswers=[];

  for(x=0;x<questionLength;x++)
  {
    //useranswers.push( results[x]['Question'+`${x+1}`+'Answer']);
    
    useranswers['Question'+`${x+1}`]=[];
   
    for(y=0;y<resultsLength;y++){ 
     // useranswers.push( results[y]['Question'+`${x+1}`+'Answer'], results[x]['Question'+`${x+1}`+'Answer']);
     
      useranswers['Question'+`${x+1}`].push( results[y]['Question'+`${x+1}`+'Answer']);
    }
  }


  console.log(useranswers); // answers given by responsents


  // console.log(answeroptions);

  //  console.log(useranswers);
 


  let answeredratio=[];

  for(x=0;x<answerLengthList.length;x++)
  {
   // answeroptions[x] 
   answeredratio['Question'+`${x+1}`]=[];

   answeroptions['Question'+`${x+1}`].forEach(function (option) {
    //count through user answers
    var cnt=0;
    var rep=0;
    while(cnt<useranswers['Question'+`${x+1}`].length){
        if(option ===useranswers['Question'+`${x+1}`][cnt] )
        {

          rep++;
         
        }
    cnt++;
    }
    answeredratio['Question'+`${x+1}`].push(option,rep);
});
    
  }

  console.log(answeredratio);  // ration of opinion available to selected per question

  //questionList
  //answeredratio

  //originalSurvey

  for(x=0;x<questionList.length;x++)
  {
  console.log(questionList[x]+" ::");
      for(y=0;y<answeredratio['Question'+`${x+1}`].length;y++){
        console.log(answeredratio['Question'+`${x+1}`][y]+" was answered by " +answeredratio['Question'+`${x+1}`][y+1]+" People");
        y=y+1;

  }


  }
///////////////////////////////////////////////////////////////

 let filename=path.join(__dirname, 'Filename.csv');
const csvWriter = createCsvWriter({
    path:filename,
    header: [
        {id: 'opinion', title: 'opinion'},
        {id: 'userresponse', title: 'userresponse'}
    ]
});
let records=[];

for(x=0;x<questionList.length;x++)
{
 
  records.push({opinion:questionList[x],userresponse:'      '});
    for(y=0;y<answeredratio['Question'+`${x+1}`].length;y++){
      records.push( 
        // answeredratio['Question'+`${x+1}`][y]+" was answered by " +answeredratio['Question'+`${x+1}`][y+1]+" People"
           {opinion: answeredratio['Question'+`${x+1}`][y],  userresponse: answeredratio['Question'+`${x+1}`][y+1]},
        )
        y=y+1;
}


}


await csvWriter.writeRecords(records)       // returns a promise
.then(() => {
    console.log('...Done');
});

  
// Specifying destination directory + file name
let destination = path.join(__dirname, 'converted_report.xlsx');
  
// try-catch block for handling exceptions
try {
  
    // Functions to convert csv to excel
    await convertCsvToXlsx(filename, destination);
} catch (e) {
  
    // Handling error
    console.error(e.toString());
}
 
 
 
await csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
    });


  await res.setHeader('Content-Type', 'text/csv'); 
 

await res.sendFile((destination), function (err) {
  if (err) throw err;
  // if no error, file has been deleted successfully
 // fs.unlink(destination);
  fs.unlink(destination, (err) => {
    if (err) {
        throw err;
    }
    else
    {
    
    }

    
});
 
 //fs.unlinkSync(destination);

});

  // await fs.unlinkSync(filename);
 

  /*

  const filename = path.join(__dirname, 'Filename.xlsx');
  var jsn = [{
    "name": "Nilesh",
    "school": "RDTC",
    "marks": "77"
   },{
    "name": "Sagar",
    "school": "RC",
    "marks": "99.99"
   },{
    "name": "Prashant",
    "school": "Solapur",
    "marks": "100"
 }];

var data='';
 
for (var i = 0; i < jsn.length; i++) {
    data=data+jsn[i].name+'\t'+jsn[i].school+'\t'+jsn[i].marks+'\n';
 }
fs.appendFile(filename, data, (err) => {
    if (err) throw err;
    console.log('File created');
 });
  
 
  
 
res.sendFile(filename, function (err) {
    if (err) {
        next(err);
    } else {
        console.log('Sent:', filename);
    }
});
*/

}



module.exports.displaySurveyList= (req, res, next) => {
    // find all books in the books collection
    
    if (req.user == null ){
    survey.find( (err, surveys) => {
      if (err) {
        return console.error(err);
      }
      else {
        res.render('surveys/index', {
          title: 'Existing Surveys',
          survey: surveys
          , displayName: req.user ? req.user.displayName: ''
        }
        );
      }
      console.log("show all");
    }
    )
    }
    else{
    survey.find({displayName: req.user.displayName}, (err, surveys)=>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else {
        res.render('surveys/index', {
          title: 'Existing Surveys',
          survey: surveys
          , displayName: req.user ? req.user.displayName: ''
        }
        );
      }
     });
    } 
     
  
  };


  
module.exports.displayCreateSurveyPage= (req, res, next) => {

  
   // res.render('surveys/details',{title:'Create A Survey',survey:'', displayName: req.user ? req.user.displayName: ''});
   res.render('surveys/surveytype',{title:'Create A Survey',survey:'', displayName: req.user ? req.user.displayName: ''});
 
 
 }


 module.exports.createSurvey= (req, res, next) => {

   
  req.body.username=req.user.username;
  req.body.displayName=req.user.displayName;

  req.body.surveyOwner = req.user.displayName;
    let formRequest = JSON.parse(JSON.stringify(req.body));
    
  

   
  req.body.surveyName="Unknown"; 
     let a_survey = survey( formRequest); //Create a new survey
  survey.create(a_survey,(err)=>
  {
  if(err)
  {
    console.log(err);
    res.end(err);
  }
  else
  {
    res.redirect('/surveys');
  }
  
  }); 
  
  }


  module.exports.finalCreate= (req, res, next) => {

   
    req.body.username=req.user.username;
    req.body.displayName=req.user.displayName;
  
    req.body.surveyOwner = req.user.displayName;

    let formRequest = JSON.parse(JSON.stringify(req.body));

    res.render('surveys/details',{title:'Create Survey',survey:formRequest, displayName: req.user ? req.user.displayName: ''});
    ;
      //let formRequest = JSON.parse(JSON.stringify(req.body));
     
     
    
    }


    module.exports.createSurveyToView= (req, res, next) => {

 
      let id=req.params.id;
      survey.findById(id,(err,surveys)=>{
       if(err)
       {
           console.log(err);
           res.end(err);
       }
       else
       {
           res.render('surveys/viewsurvey',{
               title:'View',survey:surveys, displayName: req.user ? req.user.displayName: ''
           });
       }
      });
     
   
   }


  module.exports.createSurveyToEdit= (req, res, next) => {

 
    let id=req.params.id;
    survey.findById(id,(err,surveys)=>{
     if(err)
     {
         console.log(err);
         res.end(err);
     }
     else
     {
         res.render('surveys/editsurvey',{
             title:'Edit Survey',survey:surveys, displayName: req.user ? req.user.displayName: ''
         });
     }
    });
   
 
 }


 
 module.exports.retrieveRecentlyCreatedSurvey= (req, res, next) => {

 
  let id=req.params.id;

  console.log(survey.find({}).sort({_id:-1}).limit(1));
  survey.findById(id,(err,surveys)=>{
   if(err)
   {
       console.log(err);
       res.end(err);
   }
   else
   {
       res.render('surveys/editsurvey',{
           title:'View and Edit Survey',survey:surveys, displayName: req.user ? req.user.displayName: ''
       });
   }
  });
 

}
 

 module.exports.updateSurvey= (req, res, next) => {
 
    let id=req.params.id; 
   
    req.body._id=id;
   
    //update Survey
     let updatedSurvey = survey( JSON.parse(JSON.stringify(req.body)));
      survey.updateOne({_id:id},updatedSurvey,(err)=>
      {
          if(err)
   {
      console.log(err);
      res.end(err);
   }
   else
   {
      res.redirect('/surveys');
   }
      }
      
      );
   
   }


   module.exports.deleteSurvey=(req, res, next) => {

 
     let id=req.params.id;
     survey.remove({_id:id},(err)=>
     {
         if(err)
         {
             console.log(err);
     res.end(err);  
         }
         else{
             
     res.redirect('/surveys');
         }
     }
  
  
     );
  }



  
module.exports.displaySurveyListForTakeASurvey= (req, res, next) => {
 
  
   
  survey.find( (err, surveys) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('surveys/takeasurvey', {
        title: 'Take A Survey',
        survey: surveys
        , displayName: req.user ? req.user.displayName: ''
      }
      );
    }
    console.log("show all");
  }
  )
   
 
   

};



module.exports.takeASurvey= (req, res, next) => {

 
  let id=req.params.id;
  survey.findById(id,(err,surveys)=>{
   if(err)
   {
       console.log(err);
       res.end(err);
   }
   else
   {
       res.render('surveys/anonymousSubmit',{
           title:'Take Survey',survey:surveys, displayName: req.user ? req.user.displayName: ''
       });
   }
  });
 

}




module.exports.takeAsurveyAndPost= async (req, res, next) => {

   
 
 
    let formRequest = JSON.parse(JSON.stringify(req.body));
    

    //get id from original survey
    let surveyTaken = formRequest.surveyId;

  
    let theretrievedsurevey={};
    
     let a_survey = takeasurvey( formRequest); //Create a new survey submission


     theretrievedsurevey= await survey.findById(surveyTaken); //find survey taken to increase respondednt count
     
    var oldnumber= theretrievedsurevey.respondents;//geet previous respondent number
    oldnumber=oldnumber+1;//increase by 1
    theretrievedsurevey.respondents=oldnumber;
    
    await survey.updateOne({_id:surveyTaken},theretrievedsurevey);// make final update
   
   




     takeasurvey.create(a_survey,(err)=>
  {
  if(err)
  {
    console.log(err);
    res.end(err);
  }
  else
  {
    res.redirect('/surveys/thanks');
  }
  
  }); 
  
  }





  
module.exports.statistics= async (req, res, next) => {

 
  let id=req.params.id;




  let results= await takeasurvey.find({'surveyId' :id }); // takesurvery results
 console.log(results); // survay taken results

 let questionLength= results[0].Questionlength; //sample question length
 
 console.log(questionLength);

 let resultsLength=results.length; //length of results

 console.log(resultsLength); //how many surveys taken

 let originalSurvey= await survey.findById(id); // sample of original survey
 console.log(originalSurvey);  //original survey schema

 var questionList=new Array();//Create Array

  for(x=0;x<questionLength;x++)
  {

 questionList.push(originalSurvey['Question'+`${x+1}`]);
  }


  console.log(questionList) //Array containing questions

  ///find questions length, find array for all answers

  //Question1AnswerLength

  let answerLengthList= new Array();

  for(x=0;x<questionLength;x++)
  {

    answerLengthList.push(originalSurvey['Question'+`${x+1}`+"AnswerLength"]);
  }


  console.log(answerLengthList);
 
/*
  let question1answers= new Array();
  let question2answers= new Array();
  let question3answers= new Array();
  let question4answers= new Array();
  let question5answers= new Array();
  */

 
  ///////////////////////////////////////
  let answeroptions= [];

  for(x=0;x<questionLength;x++)
  {
    answeroptions['Question'+`${x+1}`]=[];
    for(y=0;y<answerLengthList[x];y++){
   //originalSurvey['Question'+`${x+1}`+'Answer'+`${x+1}`]

    answeroptions['Question'+`${x+1}`].push( originalSurvey['Question'+`${x+1}`+'Answer'+`${y+1}`])

  }
  }

  console.log(answeroptions); // available options to each question


  /////////////////////////////
  //Question1Answer

  results
  resultsLength

  let useranswers=[];

  for(x=0;x<questionLength;x++)
  {
    //useranswers.push( results[x]['Question'+`${x+1}`+'Answer']);
    
    useranswers['Question'+`${x+1}`]=[];
   
    for(y=0;y<resultsLength;y++){ 
     // useranswers.push( results[y]['Question'+`${x+1}`+'Answer'], results[x]['Question'+`${x+1}`+'Answer']);
     
      useranswers['Question'+`${x+1}`].push( results[y]['Question'+`${x+1}`+'Answer']);
    }
  }


  console.log(useranswers); // answers given by responsents


  // console.log(answeroptions);

  //  console.log(useranswers);
 


  let answeredratio=[];

  for(x=0;x<answerLengthList.length;x++)
  {
   // answeroptions[x] 
   answeredratio['Question'+`${x+1}`]=[];

   answeroptions['Question'+`${x+1}`].forEach(function (option) {
    //count through user answers
    var cnt=0;
    var rep=0;
    while(cnt<useranswers['Question'+`${x+1}`].length){
        if(option ===useranswers['Question'+`${x+1}`][cnt] )
        {

          rep++;
         
        }
    cnt++;
    }
    answeredratio['Question'+`${x+1}`].push(option,rep);
});
    
  }

  console.log(answeredratio);  // ration of opinion available to selected per question

  //questionList
  //answeredratio

  //originalSurvey

  for(x=0;x<questionList.length;x++)
  {
  console.log(questionList[x]+" ::");
      for(y=0;y<answeredratio['Question'+`${x+1}`].length;y++){
        console.log(answeredratio['Question'+`${x+1}`][y]+" was answered by " +answeredratio['Question'+`${x+1}`][y+1]+" People");
        y=y+1;

  }


  }



  res.render('surveys/analytics',{
    title:'Analytics',survey:originalSurvey, displayName: req.user ? req.user.displayName: '',questionList:questionList,answeredratio:answeredratio,useranswers:useranswers,answeroptions:answeroptions
});


}

 
