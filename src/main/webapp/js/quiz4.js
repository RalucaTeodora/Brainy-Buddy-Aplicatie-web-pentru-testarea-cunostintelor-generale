const questions = [
  {
    question: "Care este cel mai lung fluviu din lume?",
    answers: ["Amazon", "Nil", "Yangtze", "Mississippi"],
    correct: "Nil"
  },
  {
    question: "Care este cel mai mare deșert din lume?",
    answers: ["Sahara", "Deșertul Antarctic", "Gobi", "Kalahari"],
    correct: "Deșertul Antarctic"
  },
  {
    question: "Care este cel mai înalt vârf montan din lume?",
    answers: ["Everest", "K2", "Kangchenjunga", "Lhotse"],
    correct: "Everest"
  },
  {
    question: "Ce ocean se află între Africa și Australia?",
    answers: ["Oceanul Indian", "Oceanul Atlantic", "Oceanul Pacific", "Oceanul Arctic"],
    correct: "Oceanul Indian"
  },
  {
    question: "Care este cel mai mare continent după suprafață?",
    answers: ["Asia", "Africa", "America de Nord", "Europa"],
    correct: "Asia"
  },
  {
    question: "Care este capitala Japoniei?",
    answers: ["Tokyo", "Kyoto", "Osaka", "Hiroshima"],
    correct: "Tokyo"
  },
  {
    question: "Care este cel mai adânc lac din lume?",
    answers: ["Lacul Baikal", "Lacul Tanganyika", "Marea Caspică", "Lacul Superior"],
    correct: "Lacul Baikal"
  },
  {
    question: "Ce fluviu traversează cele mai multe țări din lume?",
    answers: ["Dunărea", "Nile", "Amazon", "Mississippi"],
    correct: "Dunărea"
  },
  {
    question: "Care este cel mai mare arhipelag din lume?",
    answers: ["Indonezia", "Filipine", "Maldive", "Japonia"],
    correct: "Indonezia"
  },
  {
    question: "Ce țară are cea mai mare populație din lume?",
    answers: ["China", "India", "Statele Unite", "Indonezia"],
    correct: "China"
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

        window.location.href = 'evaluation4.html';
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
