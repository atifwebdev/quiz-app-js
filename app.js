// Quiz App JS
const quizSelector = document.getElementById('quiz-selector');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('results-container');
const questionContainer = document.getElementById('question-container');
const answerButtonsContainer = document.getElementById('answer-buttons-container');

class Quiz{
    constructor (questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
    }

    displayQuestion () {
        answerButtonsContainer.innerHTML = "";
        const currentQuestion = this.questions[this.currentQuestionIndex];
        questionContainer.textContent = currentQuestion.question;
        const answers = currentQuestion.answers;
        answers.forEach(answer => {
            const button = document.createElement("button");
            button.classList = ["answer-button"];
            button.textContent = answer;
            button.addEventListener("click", this.checkAnswer.bind(this));
            answerButtonsContainer.appendChild(button);
        });
    }

    checkAnswer (event) {
        const selectedAnswer = event.target.textContent;
        const currentQuestion = this.questions[this.currentQuestionIndex];
        if (selectedAnswer === currentQuestion.correctAnswer){
            this.score++;
            // console.log(this.score);
        }

        this.currentQuestionIndex++;

        if (this.currentQuestionIndex < this.questions.length) {
            this.displayQuestion();
        } else{
            this.showResult();
        }
    }
}

const loadQuiz = (questions) => {
    const quiz =  new Quiz(questions);
    quiz.displayQuestion();
    quizContainer.style.display = "block";
    quizSelector.style.display = "none";
};


const loadAllQuiz = async () => {
    const rsponse = await fetch("./quizzes.json");
    const quizzes = await rsponse.json();
    // console.log(quizzes);

    quizzes.forEach((quiz, index) => {
        const quizCard = document.createElement("div");
        quizCard.classList = ["quiz-card"];
        quizCard.innerText = "Quiz " + (index + 1);
        quizCard.addEventListener("click", () => loadQuiz(quiz));
        quizSelector.appendChild(quizCard);
    });
};

loadAllQuiz();