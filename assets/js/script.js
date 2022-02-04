//link items to html
var beginButton = document.querySelector("#start-quiz");
var questionBox = document.querySelector ("#question-box");
var answersBox = document.querySelector("#answerChoices");
var inputBox = document.querySelector("#userAns");


//list of questions
var jsQuestions = [
    {
        correctAns: "C",
        question: "1. This is a question? The answer is C.",
        answers: ['A. Option 1A', 'B. Option 1B', 'C. Option 1C', 'D. Option 1D'],
    },
    {
        correctAns: "B",
        question: "2. This is the second question? The answer is B.",
        answers: ['A. Option A', 'B. Option B', 'C. Option C', 'D. Option D'],
    },
    {
        correctAns: "A",
        question: "3. This is the Third question? The answer is C.",
        answers: ['A. Option A', 'B. Option B', 'C. Option C', 'D. Option D'],
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

//function to run the quiz questions and accept answers
var quizTime = function(questionNum){
    
    if (questionNum < jsQuestions.length) {

        // function to display question
        var question = jsQuestions[questionNum].question;
        question.class = "questionDis";
        questionBox.innerHTML=question;

        //add the answer options to the question box
        for(var i = 0; i < jsQuestions[questionNum].answers. length; i++){
            var ansOptions = jsQuestions[questionNum].answers[i];
            var ansList = document.createElement('li');
            ansList.innerText= ansOptions;
            answersBox.appendChild(ansList);
        };

        //function to add dropdown 
        userInput();
    
        //submit button to check ans
        var submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.className = "submitBtn";
        submitButton.id ="btnSubmit";
        inputBox.appendChild(submitButton);

        //function to check
        var checkAnswer = function (){
            var inputAns = document.querySelector("select[name='selected']").value;
            var correct = jsQuestions[questionNum].correctAns;
            console.log("User's anser:" + inputAns);
            console.log("Correct Answer: " + correct);
            if (inputAns === correct){
                console.log("correct");
            }
            else {
                console.log("wrong");
            };
            // var n = questionNum ;
            // console.log(n)
            inputBox.innerHTML='';
            answersBox.innerHTML = '';
            quizTime(questionNum +1);
        };
        //check answers after button is clicked
        submitButton.addEventListener("click", checkAnswer);
        
        
    } else{
        return;
    }
};  

//function to add dropdown/submit button and check answer
var userInput = function(questionNum){
    //create dropdown
    var userAnsOpt = ['Select Answer', 'A', 'B', 'C', 'D']
    var userChoices = document.createElement("select");
    userChoices.name="selected";

    for (var h =0; h < userAnsOpt.length; h++){
        var option = document.createElement("option");
        option.value= userAnsOpt[h];
        option.text= userAnsOpt[h];
       
        userChoices.append(option);
    }
    //append to input box
    inputBox.append(userChoices); 
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