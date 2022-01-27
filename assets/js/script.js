//link items from html
var beginButton = document.querySelector("#start-quiz");


//list of questions

//main function to begin the quiz
var quizBegin= function (){
    //alert user the quiz is about to start
    alert("The quiz is about to begin!");

    //remove Begin Button
    beginButton.remove();

    //functiion to keep time
    timeKeeper();

    //function to run the quiz
    quizTime();
};

var quizTime = function(){

    // function to display  first question and answer
    displayQA();

    //function to add dropdown/submit button and check answer
    userInput();

    //functon for response to right or wrong answer
    ansResponse();

    //function to clear and begin again
    newQuestion();
};

//displays each question and answer
var displayQA = function (){

};

//function to add dropdown/submit button and check answer
var userInput = function(){

};
//function to respond to right or wrong ans
var ansResponse = function (input){

};

//function to clear old question and display new
var newQuestion = function (){

};

//functin to keep time
var timeKeeper =function (){

};
//function to end quiz and submit score
var endQuiz = function(){

};
//function to store high scores
var highScoreStore = function(){

};

//eventLister to begin quiz
beginButton.addEventListener("click", quizBegin);