//link items to html
var beginButton = document.querySelector("#start-quiz");
var questionBox = document.querySelector ("#question-box");
var answersBox = document.querySelector("#answerChoices");
var inputBox = document.querySelector("#userAns");
var disCheckEL = document.querySelector("#rightOrWrong");
var disTimer = document.querySelector(".count-down");
var submitScoreEl = document.querySelector(".submitScore");
var timeLeft = 60;


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
    //remove Begin Button
    beginButton.remove();

    // functiion to keep time
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

        //function to check. clear, and provide a new question
        var checkAnswer = function (){
            var inputAns = document.querySelector("select[name='selected']").value;
            var correct = jsQuestions[questionNum].correctAns;
            // console.log("User's anser:" + inputAns);
            // console.log("Correct Answer: " + correct);
            if (inputAns === correct){
                disCheckEL.innerHTML = "The last answer was...CORRECT!";
            }
            else {
                wrongAnswer();
            };

            questionBox.innerHTML='';
            inputBox.innerHTML='';
            answersBox.innerHTML = '';
            quizTime(questionNum +1);
        };
        //check answers after button is clicked
        submitButton.addEventListener("click", checkAnswer);
        
        
    } else{
        endQuiz();
    }
};  

//function to add dropdown/submit button
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

 
// function to display time
var timeKeeper =function (){
    window.myTimer = setInterval(function(){
        if(timeLeft>0){
            timeLeft = timeLeft -1;
            var minLeft = Math.floor(timeLeft/60);
            var secLeft = timeLeft % 60
            var disTime = minLeft + ":" + secLeft;
            disTimer.innerHTML = disTime;
            return timeLeft;
        }else{
            endQuiz();
        }
    }, 1000)
};

//when wrong answer is chosen time is deducted and user is notified
var wrongAnswer=function(){
    timeLeft = timeLeft-10;
    disCheckEL.innerHTML = "The last answer was...WRONG!"
}

//function to end quiz and submit score
function endQuiz() {
    //save time
    var timeScore = timeLeft +10;
    console.log(timeScore);
    //stop interval
    clearInterval(window.myTimer);
    //clear other items
    inputBox.innerHTML='';
    disCheckEL.innerHTML = '';
    //show screen to add high scores
    submitScoreEl.classList.remove("hide");
    //click to save to local storage
    var scoreBtn = document.querySelector("#submitScoreBtn")
    scoreBtn.addEventListener("click",function(){
        var userIN = document.querySelector("textArea").value;
        console.log(userIN);
        highScoreStore(userIN, timeScore);  
    });
    //return timeScore;
}

//function to store high scores
var highScoreStore = function(userIN, timeScore){
    var score = timeScore;
    var user = userIN;
    console.log("local storage" + userIN + score);

    //get top score info stored in local storage
    var scoreOne = localStorage.getItem("scoreOne");
    if(!scoreOne){scoreOne=0};
    var nameOne = localStorage.getItem("nameOne")
    var scoreTwo = localStorage.getItem("scoreTwo");
    if(!scoreTwo){scoreTwo=0};
    var nameTwo = localStorage.getItem("nameTwo")
    var scoreThree = localStorage.getItem("scoreThree");
    if(!scoreThree){scoreThree=0};
    var nameThree = localStorage.getItem("nameThree")
    var scoreFour = localStorage.getItem("scoreFour");
    if(!scoreFour){scoreFour=0};
    var nameFour = localStorage.getItem("nameFour")
    var scoreFive = localStorage.getItem("scoreFive");
    if(!scoreFive){scoreFive=0};
    var nameFive = localStorage.getItem("nameFive")

    //replace info in local storage if score is beat
    if(score < scoreOne){
        //move down previous scores
        localStorage.setItem("scoreFive", scoreFour);
        localStorage.setItem("nameFive", nameFour);
        localStorage.setItem("scoreFour", scoreThree);
        localStorage.setItem("nameFour", nameThree);
        localStorage.setItem("scoreThree", scoreTwo);
        localStorage.setItem("nameThree", nameTwo);
        localStorage.setItem("scoreTwo", scoreOne);
        localStorage.setItem("nameTwo", nameTwo);
        //add new high score to #1 spot
        localStorage.setItem("scoreOne", score);
        localStorage.setItem("nameOne", user);
    } else if(score< scoreTwo){
        localStorage.setItem("scoreFive", scoreFour);
        localStorage.setItem("nameFive", nameFour);
        localStorage.setItem("scoreFour", scoreThree);
        localStorage.setItem("nameFour", nameThree);
        localStorage.setItem("scoreThree", scoreTwo);
        localStorage.setItem("nameThree", nameTwo);
        //add new high score to #2 spot
        localStorage.setItem("scoreTwo", score);
        localStorage.setItem("nameTwo", user);
    }else if(score < scoreThree){
        localStorage.setItem("scoreFive", scoreFour);
        localStorage.setItem("nameFive", nameFour);
        localStorage.setItem("scoreFour", scoreThree);
        localStorage.setItem("nameFour", nameThree);
        //add new high score to #3 spot
        localStorage.setItem("scoreThree", score);
        localStorage.setItem("nameThree", user);
    }else if(score < scoreFour){
        localStorage.setItem("scoreFive", scoreFour);
        localStorage.setItem("nameFive", nameFour);
        //add new high score to #4 spot
        localStorage.setItem("scoreThree", score);
        localStorage.setItem("nameThree", user);
    }else if(score < scoreFive){
        localStorage.setItem("scoreFive", scoreFour);
        localStorage.setItem("nameFive", nameFour);
        //add new high score to #5 spot
        localStorage.setItem("scoreFive", score);
        localStorage.setItem("nameFive", user);
    }else{return};
};

//eventLister to begin quiz
beginButton.addEventListener("click", quizBegin);