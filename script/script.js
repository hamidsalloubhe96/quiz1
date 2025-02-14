const questions = [
    { question: "Quel est le plus grand désert d'Afrique ?", answers: ["Sahara", "Kalahari", "Namib", "Gobi"], correct: "Sahara" },
    { question: "Quelle est la principale savane d'Afrique de l'Ouest ?", answers: ["Serengeti", "Sahel", "Veld", "Pampa"], correct: "Sahel" },
    { question: "Quel est le climat dominant en Afrique de l’Ouest ?", answers: ["Tropical", "Désertique", "Méditerranéen", "Océanique"], correct: "Tropical" },
    { question: "Quelle est la plus grande forêt d'Afrique de l'Ouest ?", answers: ["Forêt du Congo", "Forêt de Taï", "Forêt de Kibale", "Forêt d'Ivindo"], correct: "Forêt de Taï" },
    { question: "Quel fleuve traverse l'Afrique de l'Ouest ?", answers: ["Niger", "Nil", "Congo", "Zambèze"], correct: "Niger" },
    { question: "Quel est le plus grand lac d'Afrique de l'Ouest ?", answers: ["Lac Volta", "Lac Tchad", "Lac Victoria", "Lac Tanganyika"], correct: "Lac Volta" },
    { question: "Qui était Soundiata Keïta ?", answers: ["Empereur du Mali", "Roi du Ghana", "Prince du Congo", "Chef de tribu"], correct: "Empereur du Mali" },
    { question: "Quel empire a dominé l'Afrique de l'Ouest au 14ème siècle ?", answers: ["Empire du Mali", "Empire du Ghana", "Empire Songhaï", "Empire de Carthage"], correct: "Empire du Mali" },
    { question: "Quel est l'organe principal de la respiration ?", answers: ["Poumons", "Cœur", "Foie", "Reins"], correct: "Poumons" },
    { question: "Que signifie HTML ?", answers: ["HyperText Markup Language", "Hyperlink Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language"], correct: "HyperText Markup Language" }
    
];

let currentQuestionIndex = 0;
let score = 0;
let history = [];
let timer;
let timeLeft = 20;
let answered = false;

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const historyButton = document.getElementById("history-btn");
const historyContainer = document.getElementById("history-container");
const feedbackMessage = document.getElementById("feedback-message");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    history = [];
    updateScore();
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    answered = false;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => selectAnswer(button, answer, currentQuestion.correct));
        answerButtons.appendChild(button);
    });

    startTimer();
}

function resetState() {
    feedbackMessage.innerText = "";
    answerButtons.innerHTML = "";
    nextButton.classList.add("hidden");
    clearInterval(timer);
    timeLeft = 20;
    timerText.innerText = `Temps restant : ${timeLeft}s`;
    answered = false;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerText.innerText = `Temps restant : ${timeLeft}s`;

        if (timeLeft <= 0 && !answered) {
            clearInterval(timer);
            feedbackMessage.innerText = "⏳ Temps écoulé ! Réponse incorrecte.";
            feedbackMessage.style.color = "red";
            wrongSound.play();
            history.push({ question: questionText.innerText, selected: "Aucune", correct: questions[currentQuestionIndex].correct });
            nextButton.classList.remove("hidden");
        }
    }, 1000);
}

function selectAnswer(button, selectedAnswer, correctAnswer) {
    if (answered) return;
    answered = true;
    clearInterval(timer);
    
    if (selectedAnswer === correctAnswer) {
        feedbackMessage.innerText = "🎉 Félicitations ! Bonne réponse.";
        feedbackMessage.style.color = "green";
        correctSound.play();
        score += 5;  
    } else {
        feedbackMessage.innerText = "❌ Mauvaise réponse.";
        feedbackMessage.style.color = "red";
        button.classList.add("wrong");
        wrongSound.play();
    }

    updateScore();
    history.push({ question: questionText.innerText, selected: selectedAnswer, correct: correctAnswer });
    nextButton.classList.remove("hidden");
}

function updateScore() {
    scoreText.innerText = `Score : ${score}`;
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        feedbackMessage.innerText = `🎉 Quiz terminé ! Score final : ${score}`;
        nextButton.classList.add("hidden");
    }
});

historyButton.addEventListener("click", () => {
    historyContainer.classList.toggle("hidden");
    historyContainer.innerHTML = "<h3>Historique des réponses :</h3>";
    history.forEach((entry, index) => {
        historyContainer.innerHTML += `<p><b>Q${index + 1} :</b> ${entry.question} <br> 
                                       ➡️ Votre réponse : ${entry.selected} <br>
                                       ✅ Réponse correcte : ${entry.correct}</p><hr>`;
    });
});

startQuiz();
