const questions = [
  {
    question: "Care este cea mai mică unitate de materie?",
    answers: ["Atomul", "Molecula", "Protonul", "Neutronul"],
    correct: "Atomul"
  },
  {
    question: "Ce planetă este cunoscută ca Planeta Roșie?",
    answers: ["Marte", "Venus", "Jupiter", "Saturn"],
    correct: "Marte"
  },
  {
    question: "Ce teorie a fost propusă de Albert Einstein?",
    answers: ["Teoria relativității", "Teoria evoluției", "Teoria Big Bang", "Teoria germinării"],
    correct: "Teoria relativității"
  },
  {
    question: "Care este elementul chimic cu simbolul 'O'?",
    answers: ["Oxigen", "Osmium", "Orpiment", "Orthoacid"],
    correct: "Oxigen"
  },
  {
    question: "Care este viteza luminii în vid?",
    answers: ["299,792,458 metri pe secundă", "300,000,000 metri pe secundă", "150,000,000 metri pe secundă", "299,792,458 kilometri pe oră"],
    correct: "299,792,458 metri pe secundă"
  },
  {
    question: "Ce organism este cunoscut ca având cel mai simplu genom?",
    answers: ["Virus", "Bacterie", "Alga", "Ciuperca"],
    correct: "Virus"
  },
  {
    question: "Ce planetă este cea mai mare din sistemul nostru solar?",
    answers: ["Jupiter", "Saturn", "Neptun", "Uranus"],
    correct: "Jupiter"
  },
  {
    question: "Ce tip de celulă transportă oxigen în corpul uman?",
    answers: ["Eritrocitele", "Leucocitele", "Trombocitele", "Neuronii"],
    correct: "Eritrocitele"
  },
  {
    question: "Ce instrument măsoară presiunea atmosferică?",
    answers: ["Barometrul", "Termometrul", "Anemometrul", "Higrometrul"],
    correct: "Barometrul"
  },
  {
    question: "Ce fenomen este responsabil pentru aurora boreală?",
    answers: ["Interacțiunea particulelor solare cu atmosfera terestră", "Reflexia luminii solare pe gheața polară", "Erupțiile vulcanice subacvatice", "Ploaia de meteoriți"],
    correct: "Interacțiunea particulelor solare cu atmosfera terestră"
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

        window.location.href = 'evaluation5.html';
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
