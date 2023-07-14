
let cnt=0;

class Survey {

    constructor(name) {
        this.question = document.createDocumentFragment();
        this.name = name;


        //create div to contain elements

        var div = document.createElement("div");

        div.setAttribute("class","row questionsRow");
        div.style.border="1px solid silver";

        //create lable ,input and remove buton

        var divInput = document.createElement('div');
        divInput.setAttribute("class","col-sm-11 ");


        var label = document.createElement('label');
        label.innerHTML = "Q" +parseInt(cnt);
        
        label.setAttribute("class","labelcontrol ");

        

        /*
       <div class="form-group row">
              <label  class=" col-sm-3  " for="startDateField">Start Date</label>
              <div class="col-sm-9">
              <input type="date" class="form-control" id="startDateField" placeholder="MM/DD/YYYY"
                onfocus="(this.type='date')" name="startDate" value="<%= survey.startDate %>" required>
            </div>
            </div>
  
        */

          

        var input = document.createElement('input');

        input.setAttribute("name",`Question`+`${cnt}`);


        input.setAttribute("id",`Question`+`${cnt}`);
        input.setAttribute("placeholder",`Question `+`${cnt}`);
        input.setAttribute("class","  form-control");

        divInput.appendChild(input);

        /*



    */

        var qCnt = document.createElement('input');

        qCnt.setAttribute("name",`Question`+`${cnt}`+`AnswerLength`);
        qCnt.setAttribute("style",`display:none`);


        qCnt.setAttribute("id",`Question`+`${cnt}`+`AnswerLength`);
        qCnt.value=1;
        this.qc=qCnt;






        var options = document.createElement("div");
        /*
        Set css properties
        */
       options.setAttribute('class', 'options');
       options.setAttribute('id',`Question`+`${cnt}`+`optionbox`);
       options.setAttribute('width', 400);
       options.style.height="400";

        

        //Append question counter
       options.appendChild(qCnt)







        var remove = document.createElement('button');
        remove.innerHTML = "Remove";
      
          remove.setAttribute('onclick', 'removeNode(this)');
          remove.setAttribute("class","btn btn-danger btn-sm  space col-sm-4 col-xs-4");
          
        

        /*


    */

        // create ser ey options object
      
        //appent label input and button to div
        div.appendChild(label);
        div.appendChild(divInput);

        div.appendChild(options);
        div.appendChild(remove);


        //make final append to document fragment
        this.question.appendChild(div);
        //      this.question.appendChild(input); 
        //    this.question.appendChild(remove); 
      

    }

    add() {

        document.getElementById("surveyBox").appendChild(this.question);
        var x=0;
        while(x<2){
        var survObj= new SurveyOptions(`Question`+`${cnt}`,x+1);
        survObj.add(); 
     
        x++;
        
        }
        this.qc.value=x;
        console.log(this.name);
    }

    removeNode() {
        this.parentNode.remove()

    }

}

function addQuestion() {
   if(cnt<5){
    cnt++;
    var q = new Survey('Opinion Survey');
    q.add();
    document.getElementById("Questionlength").value=cnt;
    }
    
  
}


 
function removeNode(e) {
    cnt--;
    e.parentNode.remove();
    document.getElementById("Questionlength").value=cnt;

}








class SurveyOptions {

    constructor(name,count) {

        let cnt=0;
        this.question = document.createDocumentFragment();
        this.name = name;
 

        //create div to contain elements

        let div = document.createElement("div");
        div.setAttribute("class","row opinionRow");
        

        div.setAttribute("id",name+`Answer`+`${count}`);

        //create lable ,input and remove buton
        let checkbox = document.createElement('input');
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("disabled","disabled");
        checkbox.setAttribute("class","checkbox");


   
        

        let label = document.createElement('label');
        label.innerHTML = name+" Answer " +parseInt(count);

        /*
  
  
        */
  /*
       <div class="form-group row">
              <label  class=" col-sm-3  " for="startDateField">Start Date</label>
              <div class="col-sm-9">
              <input type="date" class="form-control" id="startDateField" placeholder="MM/DD/YYYY"
                onfocus="(this.type='date')" name="startDate" value="<%= survey.startDate %>" required>
            </div>
            </div>
  
        */
            var divInput = document.createElement('div');
        divInput.setAttribute("class","col-sm-8 col-xs-5 ");


        let input = document.createElement('input');

        
        input.setAttribute("name",name+`Answer`+`${count}`);
       


        input.setAttribute("id",name+`Answer`+`${count}`);
        input.setAttribute("placeholder", `Opinion `+`${count}`);
        input.setAttribute("class","form-control xs-4");

        divInput.appendChild(input);

        /*


    */

    



      /*
<a href="/surveys/takeasurvey/<%=survey[count]._id %>" class="btn btn-primary btn-sm">
                     
<i class="fas fa-pencil-alt"></i>Take Survey
</a>

      */


        let remove = document.createElement('a');
        remove.innerHTML = "";
        remove.setAttribute('onclick', 'removeNodeSurveyOpt(this)');
        remove.setAttribute("data-number",`${count}`);
        remove.setAttribute("data-question",name);
        remove.setAttribute("class","btn btn-danger btn-sm  space col-sm-1 col-xs-1");

        let minus = document.createElement('i');
        minus.setAttribute("class","fas fa-minus col-sm-5 xs-1");
        remove.appendChild(minus);




        let add = document.createElement('a');
        add.innerHTML = "";
        add.setAttribute('onclick', ' addOption(this)');
        add.setAttribute("data-number",`${count}`);
        add.setAttribute("data-question",name);
        add.setAttribute("class","btn btn-secondary btn-sm  col-sm-1");

        let plus = document.createElement('i');
        plus.setAttribute("class","fas fa-plus");
      
        add.appendChild(plus);

        /*


    */
        //appent label input and button to div
        div.appendChild(checkbox);
       // div.appendChild(label);
        div.appendChild(divInput);
        div.appendChild(add); 
        div.appendChild(remove);
       
        div.style.display="none";

        //make final append to document fragment

         $( this.question.appendChild(div)).fadeIn(2000);
        //this.question.appendChild(div);
        //      this.question.appendChild(input); 
        //    this.question.appendChild(remove); 

    }

    add() {
        console.log(this.name);
        console.log(this.question);
         
        var a=document.getElementById(this.name+'optionbox').appendChild(this.question);
       console.log(a);
    }

    addOutsideClass() {
        console.log(this.name);
        console.log(this.question);
         
        var a=document.getElementById(this.name).appendChild(this.question);
       console.log(a);
    }

    removeNode() {
        //

    }

}

function addOption(e) {

   // let number=e.getAttribute("data-number");    
    let question=e.getAttribute("data-question");//get designated question name
    let number=parseInt(document.getElementById(`${question}AnswerLength`).value);

    if(number<5){
    let name=e.parentNode.getAttribute("id");
    console.log(name);
    let q = new SurveyOptions(question,parseInt(number)+1);
    q.add();
    document.getElementById(`${question}AnswerLength`).value=number+1;
    }
  
}


function removeNodeSurveyOpt(e) {
    let question=e.getAttribute("data-question");//get designated question name
    let number=parseInt(document.getElementById(`${question}AnswerLength`).value);
   
   // e.parentNode.remove()
   document.getElementById(`${question}Answer${number}`).remove();
  
 
   // console.log(a);
    
    document.getElementById(`${question}AnswerLength`).value=number-1;

}

















class AgreementSurvey extends Survey {
    work() {
        console.log(this.name + ' ' + this.surname + ' builds houses.');
    }
}


class MultipleOpinion extends Survey {
    work() {
        console.log(this.name + ' ' + this.surname + ' builds houses.');
    }
}