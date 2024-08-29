
const questions = [
    {
        question: "Ce este un limbaj de programare?",
        answers: ["Un set de instrucțiuni pentru a comunica cu un calculator", "Un software pentru gestionarea bazelor de dateML", 
        "Un sistem de operare", "Un set de cuvinte și simboluri folosite pentru a crea documente textuale "],
        correct: "Un set de instrucțiuni pentru a comunica cu un calculator"
    },
    {
        question: "Care este rolul unui compilator în programare?",
        answers: ["Transformă codul sursă în cod binar.", "Execută programul.", "Gestionează interfețele grafice.", "Verifică erorile de sintaxă."],
        correct: "Transformă codul sursă în cod binar."
    },
    {
        question: "Ce este un algoritm?",
        answers: ["Un tip de bază de date.", "O variantă de limbaj de programare.", " Un set de reguli și proceduri pentru rezolvarea unei probleme.",
         "n sistem de operare open-source."],
        correct: "Un set de reguli și proceduri pentru rezolvarea unei probleme."
    },
    {
	    question: "Ce reprezintă TCP/IP în contextul rețelelor de calculatoare?",
	    answers: [
	      "Un protocol de rutare.",
	      "O limbă de programare.",
	      "Un model de referință.",
	      "Un standard de criptare."
	    ],
	    correct: "Un model de referință."
	  },
		{
    question: "Ce este un server HTTP?",
    answers: [
      "Un computer care stochează fișiere multimedia.",
      "Un program care acceptă cereri și trimite răspunsuri HTTP.",
      "Un browser web.",
      "Un protocol de securitate."
    ],
    correct: "Un program care acceptă cereri și trimite răspunsuri HTTP."
  },
  {
    question: "Care este diferența principală între Java și JavaScript?",
    answers: [
      "Java rulează pe server, JavaScript în browser.",
      "JavaScript este o versiune simplificată a Java.",
      "Java este un limbaj compilat, JavaScript este interpretat.",
      "Java este folosit exclusiv pentru aplicații mobile."
    ],
    correct: "Java este un limbaj compilat, JavaScript este interpretat."
  },
  {
    question: "Ce este un pointer în limbajul de programare C?",
    answers: [
      "O variabilă specială care stochează adresa de memorie a altei variabile.",
      "Un operator matematic.",
      "Un tip de date folosit pentru numere întregi.",
      "O funcție integrată pentru manipularea șirurilor de caractere."
    ],
    correct: "O variabilă specială care stochează adresa de memorie a altei variabile."
  },
  {
    question: "Ce este SQL?",
    answers: [
      "Un limbaj de programare orientat obiect.",
      "Un limbaj de interogare a bazelor de date.",
      "Un protocol decomunicare între servere.",
      "Un tip de firewall."
    ],
    correct: "Un limbaj de interogare a bazelor de date."
  },
  {
    question: "Ce este un algoritm de sortare 'Merge Sort'?",
    answers: [
      "Un algoritm de sortare bazat pe compararea elementelor adiacente.",
      "Un algoritm de sortare bazat pe 'divizează și cucerește'.",
      "Un algoritm de sortare aleatorie.",
      "Un algoritm de sortare in-place."
    ],
   correct: "Un algoritm de sortare bazat pe 'divizează și cucerește'."
  },
    {
    question: "Ce este un model OSI?",
    answers: [
      "Un standard de criptare a datelor.",
      "Un model de rețea care descrie procesele de comunicație între calculatoare.",
      "Un tip de firewall.",
      "Un tip de hardware pentru stocarea datelor."
    ],
    correct: "Un model de rețea care descrie procesele de comunicație între calculatoare."
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
        window.location.href = 'evaluation.html';
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
