const questions = [
  {
    question: "Cine este autorul romanului 'Mizerabilii'?",
    answers: ["Victor Hugo", "Charles Dickens", "Leo Tolstoy", "Herman Melville"],
    correct: "Victor Hugo"
  },
  {
    question: "Ce gen literar a creat J.R.R. Tolkien?",
    answers: ["Fantezie epică", "Realism magic", "Science-fiction", "Romanticism"],
    correct: "Fantezie epică"
  },
  {
    question: "Care este tema principală a romanului '1984' de George Orwell?",
    answers: ["Totalitarismul", "Războiul", "Dragostea", "Colonialismul"],
    correct: "Totalitarismul"
  },
  {
    question: "Cine a scris 'Mândrie și prejudecată'?",
    answers: ["Jane Austen", "Emily Brontë", "Charlotte Brontë", "Mary Shelley"],
    correct: "Jane Austen"
  },
  {
    question: "Ce este 'Fluxul de conștiință' în literatură?",
    answers: ["O tehnică narativă care prezintă gândurile și sentimentele unui personaj așa cum apar în mintea sa", 
              "Un gen de poezie", 
              "Un tip de personaj arhetipal", 
              "Un stil de scriere jurnalistică"],
    correct: "O tehnică narativă care prezintă gândurile și sentimentele unui personaj așa cum apar în mintea sa"
  },
  {
    question: "Cine este autorul romanului 'Război și pace'?",
    answers: ["Leo Tolstoy", "Fyodor Dostoevsky", "Ivan Turgenev", "Anton Chekhov"],
    correct: "Leo Tolstoy"
  },
  {
    question: "Ce este un sonet?",
    answers: ["Un poem cu 14 versuri", "Un roman scurt", "O povestire", "Un dialog dramatic"],
    correct: "Un poem cu 14 versuri"
  },
  {
    question: "Cine a scris piesa de teatru 'Hamlet'?",
    answers: ["William Shakespeare", "Christopher Marlowe", "Ben Jonson", "John Webster"],
    correct: "William Shakespeare"
  },
  {
    question: "Ce este simbolismul în literatură?",
    answers: ["O mișcare literară care folosește simboluri pentru a exprima idei și emoții", 
              "Un stil de scriere care descrie detalii realiste", 
              "Un gen literar de ficțiune istorică", 
              "O tehnică de povestire non-liniară"],
    correct: "O mișcare literară care folosește simboluri pentru a exprima idei și emoții"
  },
  {
    question: "Ce reprezintă termenul 'distopie' în literatură?",
    answers: ["O societate imaginară în care viața este de obicei rea, din cauza opresiunii, a controlului guvernamental sau a dezastrului", 
              "O povestire de dragoste tragică", 
              "O utopie", 
              "O biografie a unei figuri istorice"],
    correct: "O societate imaginară în care viața este de obicei rea, din cauza opresiunii, a controlului guvernamental sau a dezastrului"
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

        window.location.href = 'evaluation2.html';
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
