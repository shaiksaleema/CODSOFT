const quizQuestions = [
    {
        question: "who is the founder of microsoft?",
        opt1: "S.V.Raman",
        opt2: "Steve Henery",
        opt3: "Andrew wilson",
        opt4: "Bill Gates",
        correct: "opt4",
    },
    {
        question: "What does CSS stand for?",
        opt1: "Central Style Sheets",
        opt2: "Cascading Style Sheets",
        opt3: "Cascading Simple Sheets",
        opt4: "Cars SUVs Sailboats",
        correct: "opt2",
    },
    {
        question: "The property in CSS used to change the text color of an element is ?",
        opt1: "bgcolor",
        opt2: "color",
        opt3: "background-color",
        opt4: "All of the above",
        correct: "opt2",
    },
    {
        question: " The CSS property used to draw a line around the elements outside the border ?",
        opt1: "border",
        opt2: "outline",
        opt3: "padding",
        opt4: "line",
        correct: "opt2",
    },
];
let question_number_element = document.getElementById("question-number");
let question_txt_element = document.getElementById("question-txt");
let option_1_element = document.getElementById("option1");
let option_2_element = document.getElementById("option2");
let option_3_element = document.getElementById("option3");
let option_4_element = document.getElementById("option4");
let next_button = document.getElementById("next-button");
let time_element = document.getElementById("timer");


let current_question_number=0;
let score=0;
let time;
const total_time = 8;
let sec = total_time;

/******Handle timer*********/
function timer(){
    time_element.innerHTML = sec;
    sec--;
    if(sec==0){
        sec = total_time;
        clearInterval(time);
        current_question_number++;
        showQuestion();
    }    
}

/**
 * A function to show question and options on html page.
 */

function showQuestion(){
    sec = total_time; //assign sec to total time of timer
    clearInterval(time);
    timer();
    time = setInterval(timer,1000);
    //uncheck all the option seleceted
    document.querySelectorAll("input[name = opt]").forEach(option=> option.checked=false)
    
    if(current_question_number>=quizQuestions.length){
        goToResultPage();
    }
    //set questions and options from array
    question_number_element.innerHTML = (current_question_number+1) + ". ";
    question_txt_element.innerHTML = quizQuestions[current_question_number].question;
    option_1_element.innerHTML = quizQuestions[current_question_number].opt1;
    option_2_element.innerHTML = quizQuestions[current_question_number].opt2;
    option_3_element.innerHTML= quizQuestions[current_question_number].opt3;
    option_4_element.innerHTML= quizQuestions[current_question_number].opt4;
    // time = setInterval(timer,1000);
    
}

/**
 * Handling Event listner on button click
 */
next_button.addEventListener('click',()=>{
    let optionIdSelected = document.querySelector('input[name = opt]:checked');
            
    let option_correct = quizQuestions[current_question_number].correct;
    if(optionIdSelected!=null)
    {            
        if(optionIdSelected.id==option_correct){
            score++;        
        }
    }
    current_question_number ++;
    if(current_question_number>=quizQuestions.length){
        // show final answer
        goToResultPage();        

    }else{
        //show next question
        showQuestion();
    }
    
});
showQuestion();
function goToResultPage(){
    current_question_number = 0;
    localStorage.setItem("score", score);
    location.href = "./resultPage.html";
}