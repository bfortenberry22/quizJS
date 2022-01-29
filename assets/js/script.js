//link items to html
var beginButton = document.querySelector("#start-quiz");
var questionBox = document.querySelector ("#question-box");
var answersBox = document.querySelector("#answerChoices");


//list of questions
var jsQuestions = [
    {
        question: "1. This is a question? The answer is C.",
        answers: ['A. Option A', 'B. Option B', 'C. Option C', 'D. Option D'],
        correctAns : "C"
    },
    {
        question: "2. This is the second question? The answer is B.",
        answers: ['A. Option A', 'B. Option B', 'C. Option C', 'D. Option D'],
        correctAns : "B"
    },
    {
        question: "3. This is the Third question? The answer is C.",
        answers: ['A. Option A', 'B. Option B', 'C. Option C', 'D. Option D'],
        correctAns : "B"
    },
]

//main function to begin the quiz
var quizBegin= function (){
    //alert user the quiz is about to start
    alert("The quiz is about to begin!");

    //remove Begin Button
    beginButton.remove();

    //functiion to keep time
    timeKeeper();

    //function to run the quiz
    quizTime(0);
};

//displays each question and answer
var displayQA = function (questionNum){
    //add the question to the question box
    var question = jsQuestions[questionNum].question;
    questionBox.append(question);

    //add the answer options to the question box
    for(var i = 0; i < jsQuestions[questionNum].answers. length; i++){
        var ansOptions = jsQuestions[questionNum].answers[i];
        var ansList = document.createElement('li');
        ansList.innerText= ansOptions;
        answersBox.appendChild(ansList);
    }

};

var quizTime = function(questionNum){
    if (questionNum < jsQuestions.length){
    // function to display  first question and answer
    displayQA(questionNum);

    //function to add dropdown/submit button and check answer
    userInput();

    //functon for response to right or wrong answer
    ansResponse();

    //function to clear and begin again
    newQuestion();
    }
    //when all questions are done end quiz
    else{
        endQuiz;
    }
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