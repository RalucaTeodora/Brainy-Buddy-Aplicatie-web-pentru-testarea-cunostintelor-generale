const questions = [
  {
    question: "Cine a fost primul împărat al Romei?",
    answers: ["Augustus", "Julius Caesar", "Nero", "Caligula"],
    correct: "Augustus"
  },
  {
    question: "În ce an a început Primul Război Mondial?",
    answers: ["1914", "1918", "1939", "1945"],
    correct: "1914"
  },
  {
    question: "Cine a descoperit America în 1492?",
    answers: ["Cristofor Columb", "Vasco da Gama", "Ferdinand Magellan", "Amerigo Vespucci"],
    correct: "Cristofor Columb"
  },
  {
    question: "Care a fost cauza principală a Războiului de 100 de Ani?",
    answers: ["Succesiunea la tronul Franței", "Disputa teritorială dintre Anglia și Franța", "Revolta țăranilor francezi", "Conflictul religios"],
    correct: "Succesiunea la tronul Franței"
  },
  {
    question: "Cine a fost liderul Revoluției Bolșevice din Rusia?",
    answers: ["Vladimir Lenin", "Iosif Stalin", "Leon Troțki", "Mihail Gorbaciov"],
    correct: "Vladimir Lenin"
  },
  {
    question: "Ce s-a întâmplat la data de 6 iunie 1944?",
    answers: ["Debarcarea în Normandia (D-Day)", "Atacul asupra Pearl Harbor", "Bătălia de la Stalingrad", "Căderea Berlinului"],
    correct: "Debarcarea în Normandia (D-Day)"
  },
  {
    question: "Cine a fost primul președinte al Statelor Unite ale Americii?",
    answers: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
    correct: "George Washington"
  },
  {
    question: "Care a fost scopul principal al Renașterii?",
    answers: ["Renașterea interesului pentru arta și știința clasică", "Extinderea teritorială a Europei", "Reformele religioase", "Crearea uniunilor economice"],
    correct: "Renașterea interesului pentru arta și știința clasică"
  },
  {
    question: "În ce an a căzut Zidul Berlinului?",
    answers: ["1989", "1991", "1985", "1995"],
    correct: "1989"
  },
  {
    question: "Ce a declanșat Revoluția Franceză din 1789?",
    answers: ["Criza financiară și inegalitatea socială", "Invazia străină", "Revoltele agricole", "Reforma religioasă"],
    correct: "Criza financiară și inegalitatea socială"
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

        window.location.href = 'evaluation3.html';
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
