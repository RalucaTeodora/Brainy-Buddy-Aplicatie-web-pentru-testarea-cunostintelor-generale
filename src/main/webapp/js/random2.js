const questions = [
  {
    question: "Ce țară este cunoscută pentru cele mai multe piramide din lume?",
    answers: ["Egipt", "Mexic", "Sudan", "China"],
    correct: "Sudan"
  },
  {
    question: "Ce organ al corpului uman este responsabil pentru filtrarea sângelui?",
    answers: ["Inima", "Ficatul", "Rinichii", "Plămânii"],
    correct: "Rinichii"
  },
  {
    question: "În ce an a avut loc Revoluția Franceză?",
    answers: ["1789", "1776", "1804", "1812"],
    correct: "1789"
  },
  {
    question: "Care este cea mai mare planetă din sistemul nostru solar?",
    answers: ["Jupiter", "Saturn", "Neptun", "Uranus"],
    correct: "Jupiter"
  },
  {
    question: "Ce pictor este cunoscut pentru crearea lucrării 'Guernica'?",
    answers: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"],
    correct: "Pablo Picasso"
  },
  {
    question: "Ce mare explorator a fost primul european care a ajuns în India pe mare?",
    answers: ["Cristofor Columb", "Vasco da Gama", "Ferdinand Magellan", "James Cook"],
    correct: "Vasco da Gama"
  },
  {
    question: "Care este limba oficială în Brazilia?",
    answers: ["Spaniola", "Portugheza", "Engleza", "Franceza"],
    correct: "Portugheza"
  },
  {
    question: "Care este simbolul chimic pentru aur?",
    answers: ["Au", "Ag", "Fe", "Hg"],
    correct: "Au"
  },
  {
    question: "Ce țară a găzduit Jocurile Olimpice de vară din 2008?",
    answers: ["China", "Grecia", "Australia", "Brazilia"],
    correct: "China"
  },
  {
    question: "Ce matematician grec este cunoscut ca fiind 'tatăl geometriei'?",
    answers: ["Aristotel", "Pitagora", "Euclid", "Arhimede"],
    correct: "Euclid"
  }
];
;


    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = {};

    const questionCounter = document.querySelector('.question-counter');
    const quizQuestionContainer = document.querySelector('.quiz-question-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn');
    const questionContainer = document.querySelector('.quiz-question-container');
    const popup = document.getElementById('quiz-result-popup');
    const resultMessage = document.getElementById('result-message');
    const closePopupBtn = document.getElementById('close-popup');
 

    function updateQuestionCounter() {
        questionCounter.textContent = `Întrebarea ${currentQuestionIndex + 1} din ${questions.length}`;
    }

    function loadQuestion(index) {
        const currentQuestion = questions[index];
        questionContainer.innerHTML = `
            <div class="quiz-question active">
                <h3>${currentQuestion.question}</h3>
                <ul>
                    ${currentQuestion.answers.map(answer => `
                        <li class="quiz-answer" data-value="${answer}">
                            ${answer}
                        </li>`).join('')}
                </ul>
            </div>
        `;

        document.querySelectorAll('.quiz-answer').forEach(answer => {
            answer.addEventListener('click', function() {
                const answerValue = this.getAttribute('data-value');
                userAnswers[index] = answerValue;

                // Elimină clasa 'selected' de la toate răspunsurile și adaugă la cel selectat
                document.querySelectorAll('.quiz-answer').forEach(ans => {
                    ans.classList.remove('selected');
                });
                this.classList.add('selected');

                // Calculare scor
                score = Object.keys(userAnswers).reduce((acc, questionIndex) => {
                    const userAnswer = userAnswers[questionIndex];
                    const correctAnswer = questions[questionIndex].correct;
                    if (userAnswer === correctAnswer) {
                        acc++;
                    }
                    return acc;
                }, 0);
            });

            if (userAnswers[index] && userAnswers[index] === answer.getAttribute('data-value')) {
                answer.classList.add('selected');
            }
        });
    }

     function showResult() {
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
        localStorage.setItem('questions', JSON.stringify(questions));

        window.location.href = 'randomevaluation2.html';
    }

       

    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            questionContainer.classList.add('slide-out');
            setTimeout(() => {
                currentQuestionIndex--;
                loadQuestion(currentQuestionIndex);
                questionContainer.classList.remove('slide-out');
                updateQuestionCounter(); // Actualizare număr întrebare
            }, 300);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            questionContainer.classList.add('slide-in');
            setTimeout(() => {
                currentQuestionIndex++;
                loadQuestion(currentQuestionIndex);
                questionContainer.classList.remove('slide-in');
                updateQuestionCounter(); // Actualizare număr întrebare
            }, 300);
        }
    });

    finishBtn.addEventListener('click', () => {
        showResult();
    });

    closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';

        currentQuestionIndex = 0;
        score = 0;
        userAnswers = {};
        loadQuestion(currentQuestionIndex);
        updateQuestionCounter();

        window.location.href = 'index2.html';
    });

    loadQuestion(currentQuestionIndex);
    updateQuestionCounter();
