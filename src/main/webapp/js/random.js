
const questions = [
    {
        question: "Care este capitala Franței?",
        answers: ["Paris", "Londra", "Berlin", "Madrid"],
        correct: "Paris"
    },
    {
    question: "Ce fruct este cunoscut pentru conținutul său ridicat de potasiu?",
    answers: ["Banana", "Mărul", "Portocala", "Strugurele"],
    correct: "Banana"
  },
    {
    question: "Câte continente există pe Pământ?",
    answers: ["7", "5", "6", "8"],
    correct: "7"
  },
  {
    question: "Cine a scris piesa 'Romeo și Julieta'?",
    answers: ["William Shakespeare", "Charles Dickens", "Leo Tolstoy", "Jane Austen"],
    correct: "William Shakespeare"
  },
  {
    question: "Care este cel mai mare mamifer terestru?",
    answers: ["Elefantul", "Gorila", "Leul", "Ursul polar"],
    correct: "Elefantul"
  },
  {
    question: "Ce culoare are un smarald?",
    answers: ["Verde", "Roșu", "Albastru", "Galben"],
    correct: "Verde"
  },
  {
    question: "Ce instrument muzical are 88 de clape?",
    answers: ["Pianul", "Chitara", "Vioara", "Trompeta"],
    correct: "Pianul"
  },
  {
    question: "Ce planetă este cea mai apropiată de Soare?",
    answers: ["Mercur", "Venus", "Marte", "Jupiter"],
    correct: "Mercur"
  },
  {
    question: "Cine a fost primul om care a pășit pe Lună?",
    answers: ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "John Glenn"],
    correct: "Neil Armstrong"
  },
  {
    question: "Ce element chimic are simbolul 'H'?",
    answers: ["Hidrogen", "Heliu", "Mercur", "Oxigen"],
    correct: "Hidrogen"
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

            // Marchează răspunsul selectat dacă există
            if (userAnswers[index] && userAnswers[index] === answer.getAttribute('data-value')) {
                answer.classList.add('selected');
            }
        });
    }

     function showResult() {
        // Salvare răspunsuri utilizator și răspunsuri corecte în localStorage
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
        localStorage.setItem('questions', JSON.stringify(questions));

        // Redirecționare către pagina de evaluare
        window.location.href = 'randomevaluation.html';
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
