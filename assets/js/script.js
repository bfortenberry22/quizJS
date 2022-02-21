//link items to html
var introBoxEl = document.querySelector(".introBox")
var beginButton = document.querySelector("#start-quiz");
var questionBox = document.querySelector ("#question-box");
var answersBox = document.querySelector("#answerChoices");
var inputBox = document.querySelector("#userAns");
var disCheckEL = document.querySelector("#rightOrWrong");
var disTimer = document.querySelector(".count-down");
var submitScoreEl = document.querySelector(".submitScore");
var directionEl = document.querySelector(".directions");
var timerEl = document.querySelector("#time-keeper");
var scoreBoardEl = document.querySelector(".scoreBoard");
var scoreBtn = document.querySelector("#high-scores");
var displayBoxEl = document.querySelector(".display-box");
var timeLeft = 60;


//list of questions
var jsQuestions = [
    {
        correctAns: "C",
        question: "1. A function that is used as an argument to another function is a __________.",
        answers: ['A. event listener', 'B. sum function ', 'C. callback function', 'D. argumental function'],
    },
    {
        correctAns: "B",
        question: "2. What needs to be added to observe an event?",
        answers: ['A. Interval', 'B. Event Listener', 'C. Event Handler', 'D. Timeout'],
    },
    {
        correctAns: "D",
        question: "3. What is used for a function to repeat itself at a set interval?",
        answers: ['A. intervalRepeat()', 'B. setTimeout()', 'C. repeatTime()', 'D. setInterval()'],
    },
    {
        correctAns: "D",
        question: "4. What is one way to access an element from the html?",
        answers: ['A. document.querySelector()', 'B. document.getElementbyId()', 'C. class ="userInput"', 'D. Both A and B'],
    },
    {
        correctAns: "A",
        question: "5. The condition of an if /then statement is enclosed in __________.",
        answers: ['A. parentheses', 'B. brackets', 'C. quotes', 'D. curly brakets'],
    },
]

//main function to begin the quiz
var quizBegin= function (){
    //remove directions/Begin Button & high scores
    introBoxEl.classList.add("hide");
    //scoreBtn.classList.add("hide");

    //add "time:"
    timerEl.classList.remove("hide");

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
    var timeScore = timeLeft;
    var disTime = "0:"+timeLeft;
    disTimer.innerHTML = disTime;
    console.log(timeScore);
    //stop interval
    clearInterval(window.myTimer)
    //clear other items
    displayBoxEl.classList.add("hide");
    //show screen to add high scores
    submitScoreEl.classList.remove("hide");
    //click to save to local storage
    var scoreBtn = document.querySelector("#submitScoreBtn")
    scoreBtn.addEventListener("click",function(){
        var userIN = document.querySelector("textArea").value;
        console.log(userIN);
        highScoreStore(userIN, timeScore);  
        submitScoreEl.classList.add("hide");
        showScores();
    });
}

//get top score info stored in local storage
var getScores = function(){

    scoreOne = localStorage.getItem("scoreOne");
    if(!scoreOne){scoreOne=0};
    nameOne = localStorage.getItem("nameOne")
    scoreTwo = localStorage.getItem("scoreTwo");
    if(!scoreTwo){scoreTwo=0};
    nameTwo = localStorage.getItem("nameTwo")
    scoreThree = localStorage.getItem("scoreThree");
    if(!scoreThree){scoreThree=0};
    nameThree = localStorage.getItem("nameThree")
    scoreFour = localStorage.getItem("scoreFour");
    if(!scoreFour){scoreFour=0};
    nameFour = localStorage.getItem("nameFour")
    scoreFive = localStorage.getItem("scoreFive");
    if(!scoreFive){scoreFive=0};
    nameFive = localStorage.getItem("nameFive")
};
   
//function to store high scores
var highScoreStore = function(userIN, timeScore){
    var score = timeScore;
    var user = userIN;
    console.log("local storage" + userIN + score);

    getScores();

    //replace info in local storage if score is beat
    if(score > scoreOne){
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
    } else if(score > scoreTwo){
        localStorage.setItem("scoreFive", scoreFour);
        localStorage.setItem("nameFive", nameFour);
        localStorage.setItem("scoreFour", scoreThree);
        localStorage.setItem("nameFour", nameThree);
        localStorage.setItem("scoreThree", scoreTwo);
        localStorage.setItem("nameThree", nameTwo);
        //add new high score to #2 spot
        localStorage.setItem("scoreTwo", score);
        localStorage.setItem("nameTwo", user);
    }else if(score > scoreThree){
        localStorage.setItem("scoreFive", scoreFour);
        localStorage.setItem("nameFive", nameFour);
        localStorage.setItem("scoreFour", scoreThree);
        localStorage.setItem("nameFour", nameThree);
        //add new high score to #3 spot
        localStorage.setItem("scoreThree", score);
        localStorage.setItem("nameThree", user);
    }else if(score > scoreFour){
        localStorage.setItem("scoreFive", scoreFour);
        localStorage.setItem("nameFive", nameFour);
        //add new high score to #4 spot
        localStorage.setItem("scoreThree", score);
        localStorage.setItem("nameThree", user);
    }else if(score > scoreFive){
        localStorage.setItem("scoreFive", scoreFour);
        localStorage.setItem("nameFive", nameFour);
        //add new high score to #5 spot
        localStorage.setItem("scoreFive", score);
        localStorage.setItem("nameFive", user);
    }else{return};
};
//function to display scores
var showScores = function(){
    //hide other info
    introBoxEl.classList.add("hide");
    displayBoxEl.classList.add("hide");
    //stop timer
    clearInterval(window.myTimer);
    getScores();
    scoreBoardEl.classList.remove("hide");
    //display 1st place
    firstPlaceEl = document.querySelector("#firstPlace");
    var disFirst = nameOne +" - "+ scoreOne;
    console.log(disFirst)
    firstPlaceEl.innerHTML= "1. " + disFirst;
    //display 2nd place
    secondPlaceEl = document.querySelector("#secondPlace");
    var disSecond = nameTwo +" - "+ scoreTwo;
    secondPlaceEl.innerHTML= "2. " + disSecond;
    //display 3rd place
    thirdPlaceEl = document.querySelector("#thirdPlace");
    var disThird = nameThree +" - "+ scoreThree;
    thirdPlaceEl.innerHTML= "3. " + disThird;
    //display 4th place
    fourthPlaceEl = document.querySelector("#fourthPlace");
    var disFourth = nameFour +" - "+ scoreFour;
    fourthPlaceEl.innerHTML= "4. " + disFourth;
    //display 5th place
    fifthPlaceEl = document.querySelector("#fifthPlace");
    var disFifth = nameFive +" - "+ scoreFive;
    fifthPlaceEl.innerHTML= "5. " + disFifth;

    //functionality to the "done" button
    doneButtonEl = document.querySelector("#doneBtn");
    doneButtonEl.addEventListener("click", reset);
}
var reset = function(){
    location.reload()
}

//high score button to be clicked
scoreBtn.addEventListener("click", showScores);

//eventLister to begin quiz
beginButton.addEventListener("click", quizBegin);