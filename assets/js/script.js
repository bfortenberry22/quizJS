//link items to html
var beginButton = document.querySelector("#start-quiz");
var questionBox = document.querySelector ("#question-box");
var answersBox = document.querySelector("#answerChoices");
var inputBox = document.querySelector("#userAns");
var timeLeft = 600;


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
            console.log("User's anser:" + inputAns);
            console.log("Correct Answer: " + correct);
            if (inputAns === correct){
                console.log("correct");
            }
            else {
                console.log("wrong")
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
        return;
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
    display=document.querySelector("#count-down");
    setInterval(function(){
        if(timeLeft>0){
            timeLeft = timeLeft -1;
            var minLeft = Math.floor(timeLeft/60);
            console.log(minLeft);
            var secLeft = timeLeft % 60
            var disTime = minLeft + ":" + secLeft;
            display.innerHTML = disTime;
        }else{
            alert("TIME IS UP!")
        }
    }, 1000)
};
//function to deduct time
var wrongAnswer=function(){
    timeLeft = timeLeft-10;
}

//function to end quiz and submit score
// function endQuiz() {
// }

//function to store high scores
var highScoreStore = function(){

};

//eventLister to begin quiz
beginButton.addEventListener("click", quizBegin);