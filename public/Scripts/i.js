var cnt=0;
var cnt2=0;

var cnttf=0;



function creationDate()
{
    
    
    const timeElapsed = Date.now();
const today = new Date(timeElapsed);
 
document.getElementById("createdDate").value=today.toLocaleDateString();

}
 
function triggertf()
{

    creationDate();

//document.getElementById("createdDate").value=today.toLocaleDateString();

    if(document.getElementById("ijsQuestionlength"))
    cnt=parseInt(document.getElementById("ijsQuestionlength").value);
    
    if(cnttf<5)
    {
    let x=document.getElementById("question_sampletf");
 
let cln =x.cloneNode(true);
cln.classList.add("removeNode");
 
//find  child that corresponds to input and set name
cln.style.display="block";
cln.id="";
//attach node and set name
 cln.children[2].setAttribute("name",`Question`+`${cnttf+1}`);


 cln.children[2].setAttribute("id",`Question`+`${cnttf+1}`);
 cln.children[2].setAttribute("placeholder",`Question `+`${cnttf+1}`);
//give label name
cln.children[1].innerHTML=`Question `+`${cnttf+1}`;
 //Alsoset proper name for first answer
 cln.querySelector('#answerSettf').children[0].setAttribute("name",`Question`+`${cnttf+1}`+`Answer`+`${1}`)
 
 cln.querySelector('#answerSettf').children[3].setAttribute("name",`Question`+`${cnttf+1}`+`Answer`+`${1}`)

//reset answerset child id value


cln.querySelector('.answerlength').setAttribute("name",`Question`+`${cnttf+1}`+`AnswerLength`);
cln.querySelector('#answerSettf').id="";



document.getElementById("form").appendChild(cln);
//document.getElementsByName("xxxxx").sty
cnttf++;

document.getElementsByName("Questionlengthtf")[0].value=cnttf;
    }
    else
    return;
}

function trigger()
{
    creationDate();
    if(document.getElementById("ijsQuestionlength"))
    cnt=parseInt(document.getElementById("ijsQuestionlength").value);
    //alert(cnt);
    if(cnt<5)
    {
    let x=document.getElementById("question_sample");
 
let cln =x.cloneNode(true);
cln.classList.add("removeNode");
 
//find  child that corresponds to input and set name
cln.style.display="block";
cln.id="";
//attach node and set name
//alert(cnt);
 cln.children[2].setAttribute("name",`Question`+`${cnt+1}`);


 cln.children[2].setAttribute("id",`Question`+`${cnt+1}`);
 cln.children[2].setAttribute("placeholder",`Question `+`${cnt+1}`);
//give label name
cln.children[1].innerHTML=`Question `+`${cnt+1}`;
 //Alsoset proper name for first answer
 cln.querySelector('#answerSet').children[1].setAttribute("name",`Question`+`${cnt+1}`+`Answer`+`${1}`)

//reset answerset child id value
cln.querySelector('#answerSet').id="";

cln.querySelector('.answerlength').setAttribute("name",`Question`+`${cnt+1}`+`AnswerLength`);

cln.querySelector('.answerlength').setAttribute("style",`display:none`);

document.getElementById("form").appendChild(cln);
//document.getElementsByName("xxxxx").sty
cnt++;

document.getElementsByName("Questionlength")[0].value=cnt;
document.getElementById("ijsQuestionlength").value=cnt;
    }
    else
    return;
}

function trigger2delete(e)
{  
let parent=e.parentNode;

var answerChildren=parent.parentNode.querySelectorAll('.anAnswer');
var length=answerChildren.length;

var answerLengthName=parent.parentNode.children[2].name+ "AnswerLength";
parent.parentNode.parentNode.querySelector('.answerlength').setAttribute("name",answerLengthName);

parent.parentNode.parentNode.querySelector('.answerlength').setAttribute("value",(length-1));
parent.remove();

var va=document.getElementById("removeAnswer").value;
document.getElementById("removeAnswer").value=va-1;
//alert("out")
//remove the most lenth indexed node

}


function trigger2(e)
{ 
    //calculate how many answer nodes
    let x=document.getElementById("answerSet")
 
    //CLONE THE NODE
let cln =x.cloneNode(true);
//THE EVENT THAT CALLED PARENT NOTED AS Z
var answerParent=e.parentNode;
//PARENT TO Z IS Y
 

//find length of all children that are answers
var answerChildren=answerParent.querySelectorAll('.anAnswer');
var length=answerChildren.length;

if(length<4){
 //access sibling to parent node which is element that contains name attributr of question
 let prevSiblings = answerParent.previousElementSibling;
 let name = prevSiblings.getAttribute('name')
 console.log(name);

 
cln.children[0].innerHTML=`Answer `+`${length+1}`;
cln.children[1].setAttribute("name",`${name}`+`Answer`+`${length+1}`);
cln.children[1].setAttribute("id",`${name}`+`Answer`+`${length+1}`);
cln.children[1].setAttribute("placeholder",`Answer `+`${length+1}`);
//z.appendChild(cln);

//document.getElementById("question_sample").appendChild(cln);
//APPEND TO Y

//x..appendChild(cln);
//answerParent.insertBefore(cln, this.nextSibling);
answerParent.appendChild(cln);

//Debugging Code
answerChildren=answerParent.querySelectorAll('.anAnswer');
console.log(answerChildren.length);

console.log(answerParent.parentNode.children[2].name+ " "+ (length+1));
var answerLengthName=answerParent.parentNode.children[2].name+ "AnswerLength";
answerParent.parentNode.querySelector('.answerlength').setAttribute("name",answerLengthName);

answerParent.parentNode.querySelector('.answerlength').setAttribute("value",(length+1));
}


}


function multipleChoice()
{ 
    let addQ=document.getElementById("addQuestion");
    addQ.style.display="inline";
    let tfaddQ=document.getElementById("addQuestiontf");
    tfaddQ.style.display="none";
cnttf=0;
}

function trueOrFalse()
{

    let McQ=document.getElementById("addQuestion");
    McQ.style.display="none";
    let addQ=document.getElementById("addQuestiontf");
    addQ.style.display="inline";
 

    let questionLength = document.getElementsByClassName("removeNode").length;
    console.log(questionLength);
 var questionSample;
    for (var i = 0; i < questionLength; i++) {
        questionSample= document.getElementsByClassName("removeNode")[i];
        questionSample.style.display="none";
        
    }
 
   cnt=0; 

}

document.getElementById("addQuestion").addEventListener("click",trigger);

document.getElementById("addQuestiontf").addEventListener("click",triggertf);

//document.getElementById("addAnswer").addEventListener("click",trigger2);