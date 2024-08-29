const questions = [
  {
    question: "Ce fizician a descoperit principiile teoriei relativității generale?",
    answers: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Max Planck"],
    correct: "Albert Einstein"
  },
  {
    question: "În ce an a avut loc căderea Imperiului Roman de Apus?",
    answers: ["476", "1492", "1066", "1215"],
    correct: "476"
  },
  {
    question: "Care este capitala Mongoliei?",
    answers: ["Ulaanbaatar", "Beijing", "Astana", "Tashkent"],
    correct: "Ulaanbaatar"
  },
  {
    question: "Ce element chimic are numărul atomic 92?",
    answers: ["Plumb", "Uranium", "Plutoniu", "Carbon"],
    correct: "Uranium"
  },
  {
    question: "Cine a pictat plafonul Capelei Sixtine?",
    answers: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"],
    correct: "Michelangelo"
  },
  {
    question: "Care este cea mai mare lună a lui Saturn?",
    answers: ["Titan", "Europa", "Io", "Ganymede"],
    correct: "Titan"
  },
  {
    question: "Ce matematician a introdus conceptul de 'infinit' în calculele sale?",
    answers: ["Leonhard Euler", "Isaac Newton", "Georg Cantor", "René Descartes"],
    correct: "Georg Cantor"
  },
  {
    question: "Care este lungimea ecuatorului Pământului?",
    answers: ["40,075 km", "30,075 km", "50,075 km", "20,075 km"],
    correct: "40,075 km"
  },
  {
    question: "Ce autor a scris romanul 'Război și pace'?",
    answers: ["Fyodor Dostoevsky", "Anton Chekhov", "Leo Tolstoy", "Vladimir Nabokov"],
    correct: "Leo Tolstoy"
  },
  {
    question: "Ce filozof grec a fost învățătorul lui Alexandru cel Mare?",
    answers: ["Socrates", "Plato", "Aristotle", "Heraclitus"],
    correct: "Aristotle"
  }
];




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

                document.querySelectorAll('.quiz-answer').forEach(ans => {
                    ans.classList.remove('selected');
                });
                this.classList.add('selected');

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

        window.location.href = 'randomevaluation3.html';
    }

       

    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            questionContainer.classList.add('slide-out');
            setTimeout(() => {
                currentQuestionIndex--;
                loadQuestion(currentQuestionIndex);
                questionContainer.classList.remove('slide-out');
                updateQuestionCounter(); 
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
                updateQuestionCounter(); 
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
