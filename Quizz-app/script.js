const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "What is the smallest state in India by area?",
        answers: [
            { text: "Delhi", correct: false},
            { text: "Hyderabad", correct: false},
            { text: "Goa", correct: true},
            { text: "Tamilnadu", correct: false},
        ]
    },
    {
        question: "What is the smallest bone in the human body?",
        answers: [
            { text: "Brain", correct: false},
            { text: "Lungs", correct: false},
            { text: "NOose", correct: false},
            { text: "Stapes", correct: true},
        ]
    },
    {
        question: "What is the highest mountain in the world?",
        answers: [
            { text: "Mount Everest", correct: true},
            { text: "China", correct: false},
            { text: "Russia", correct: false},
            { text: "U.S.A", correct: false},
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Arzentina", correct: false},
            { text: "Paris", correct: true},
            { text: "Delhi", correct: false},
            { text: "Armenia", correct: false},
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Philips", correct: false},
            { text: "newton", correct: false},
            { text: "Leonardo da Vinci", correct: true},
            { text: "Bob", correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz (){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }

}

function selectAnswer (e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();