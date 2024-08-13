const questions = [
    {
        question: "María y sus amigas reciclan botellas para vender. En la mañana, recolectaron 28 botellas y, en la tarde, 16 botellas menos que en la mañana. ¿Cuántas botellas recolectaron por la tarde?",
        options: ["12 botellas", "13 botellas", "14 botellas", "18 botellas"],
        answer: 0
    },
    {
        question: "Marco compra 48 paquetes de galletas y Ada compra 25 paquetes menos que Marco. ¿Cuántos paquetes de galletas compra Ada?",
        options: ["11 paquetes", "23 paquetes", "25 paquetes", "21 paquetes"],
        answer: 1
    },
    {
        question: "Ada tiene 28 cajas de naranjas. Vende algunas cajas y ahora tiene 15 cajas de naranjas. ¿Cuántas cajas de naranjas vendió Ada?",
        options: ["13 cajas", "12 cajas", "11 cajas", "14 cajas"],
        answer: 0
    },
    {
        question: "José tiene 48 figuritas. Regala algunas figuritas y ahora tiene 30 figuritas. ¿Cuántas figuritas regaló José?",
        options: ["18 figuritas", "17 figuritas", "19 figuritas", "20 figuritas"],
        answer: 0
    },
    {
        question: "Compré 20 manzanas. Mi amigo me invitó algunas manzanas más. Ahora tengo 32 manzanas. ¿Cuántas manzanas le invitó su amigo?",
        options: ["12 manzanas", "14 manzanas", "15 manzanas", "16 manzanas"],
        answer: 0
    },
    
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;
let selectedAnswers = [];
let studentName = "";

function startGame() {
    studentName = document.getElementById('student-name').value.trim();
    if (studentName === "") {
        alert("Por favor, ingresa tu nombre y apellidos.");
        return;
    }
    
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('results-container').style.display = 'none';
    
    document.getElementById('student-name-display').textContent = `Estudiante: ${studentName}`;
    
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = [];
    loadQuestion();
    startTimer();
    updateQuestionCounter();
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach((button, index) => {
        button.textContent = currentQuestion.options[index];
    });

    resetTimer();
    updateQuestionCounter();
}

function selectOption(optionIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    selectedAnswers.push({
        question: currentQuestion.question,
        selected: currentQuestion.options[optionIndex],
        correct: currentQuestion.options[currentQuestion.answer]
    });
    if (optionIndex === currentQuestion.answer) {
        score++;
    }
    currentQuestionIndex++;
    loadQuestion();
}

function updateQuestionCounter() {
    const questionCounter = document.getElementById('question-counter');
    questionCounter.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Tiempo: ${timeLeft}s`;

        if (timeLeft <= 0) {
            currentQuestionIndex++;
            loadQuestion();
        }
    }, 1000);
}

function resetTimer() {
    timeLeft = 60;
    document.getElementById('timer').textContent = `Tiempo: ${timeLeft}s`;
}

function endGame() {
    clearInterval(timer);
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';

    document.getElementById('student-name-result').textContent = studentName;
    document.getElementById('score').textContent = `Tu puntaje es: ${score} de ${questions.length}`;

    const answerList = document.getElementById('answer-list');
    answerList.innerHTML = '';
    selectedAnswers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.innerHTML = `<strong>Pregunta ${index + 1}:</strong> ${answer.question} <br> 
        <strong>Tu respuesta fue:</strong> ${answer.selected} <br> 
        <strong>Respuesta correcta fue:</strong> ${answer.correct} <br><br>`;
        answerList.appendChild(answerElement);
    });
}

function restartGame() {
    document.getElementById('student-name').value = "";
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'none';
    document.getElementById('start-container').style.display = 'block';
}

// Inicializa el juego al cargar la página
window.onload = () => {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'none';
};
