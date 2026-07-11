document.addEventListener('DOMContentLoaded', () => {

    const basicsQuestions = [
        {
            question: "Translate: 'Apple'",
            answers: ["Яблуко", "Груша", "Апельсин", "Банан"],
            correct: 0
        },
        {
            question: "Translate: 'Cat'",
            answers: ["Собака", "Кіт", "Миша", "Птах"],
            correct: 1
        },
        {
            question: "Translate: 'Red'",
            answers: ["Синій", "Жовтий", "Червоний", "Зелений"],
            correct: 2
        },
        {
            question: "Translate: 'Book'",
            answers: ["Ручка", "Олівець", "Книга", "Зошит"],
            correct: 2
        },
        {
            question: "Translate: 'Sun'",
            answers: ["Місяць", "Сонце", "Земля", "Небо"],
            correct: 1
        }
    ];

    const phrasesQuestions = [
        {
            question: "Translate: 'Good morning'",
            answers: ["Добрий вечір", "На добраніч", "Добрий день", "Доброго ранку"],
            correct: 3
        },
        {
            question: "Translate: 'I am happy'",
            answers: ["Я сумний", "Я щасливий", "Я втомився", "Я голодний"],
            correct: 1
        },
        {
            question: "Translate: 'Where are you?'",
            answers: ["Хто ти?", "Як ти?", "Де ти?", "Куди ти йдеш?"],
            correct: 2
        },
        {
            question: "Translate: 'Delicious'",
            answers: ["Смачний", "Огидний", "Солодкий", "Гіркий"],
            correct: 0
        },
        {
            question: "Translate: 'Friend'",
            answers: ["Ворог", "Друг", "Сусід", "Брат"],
            correct: 1
        }
    ];

    const literatureQuestions = [
        {
            question: "Translate: 'Ephemeral'",
            answers: ["Вічний", "Тимчасовий", "Міцний", "Прозорий"],
            correct: 1
        },
        {
            question: "Translate: 'Serendipity'",
            answers: ["Невдача", "Щасливий випадок", "Спокій", "Сум"],
            correct: 1
        },
        {
            question: "Translate: 'To procrastinate'",
            answers: ["Прискорювати", "Відкладати на потім", "Планувати", "Забувати"],
            correct: 1
        },
        {
            question: "Translate: 'Ambiguous'",
            answers: ["Чіткий", "Двозначний", "Амбітний", "Простий"],
            correct: 1
        },
        {
            question: "Translate: 'Resilient'",
            answers: ["Слабкий", "Жорсткий", "Стійкий", "Гнучкий"],
            correct: 2
        }
    ];

    let questions = []; // Will be set on start

    // Створення елементів
    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    // const startBtn = document.querySelector('#start-btn'); // Removed
    const restartBtn = document.querySelector('#restart-btn');
    const resultText = document.querySelector('.result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const topicButtons = document.querySelectorAll('.topic-btn');

    let questionIndex = 0;
    let score = 0;
    let timer = 15; // Таймер на 15 секунд
    const timerDisplay = document.querySelector('#timer');
    let interval; // Змінна для зберігання інтервалу

    // Функція для відображення запитання
    function showQuestion(question) {
        if (!question) return;

        clearInterval(interval); // Скидаємо таймер
        startTimer();

        answersContainer.innerHTML = '';
        questionText.innerText = question.question;
        for (let i = 0; i < question.answers.length; i++) {
            const button = document.createElement('button');
            button.innerText = question.answers[i];
            button.classList.add('answer-btn');
            button.addEventListener('click', () => checkAnswer(button, i));
            answersContainer.appendChild(button);
        }
    }

    // Завдання 5 - Функція для переходу до наступного запитання
    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

    // Завдання 4 - Перевірка відповіді
    function checkAnswer(button, i) {
        if (i == questions[questionIndex].correct) {
            score++;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }
        // Відключення кнопок після вибору відповіді
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        })
        // Таймер на 1 секунду
        setTimeout(nextQuestion, 1000);
    }


    // Завдання 7 - Відображення результату і статистики
    function showResult() {
        const accuracy = Math.round((score / questions.length) * 100);
        resultText.innerText = `Твій результат: ${score}/${questions.length} (${accuracy}%)`;
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
        // Check if element exists before setting it, though it wasn't in list above, line 92 in original
        const finalScore = document.querySelector('#final-score');
        if (finalScore) finalScore.innerText = score;
    }

    // Завдання 3 - Керування екранами (JS)
    function startGame(theme) {
        if (theme === 'basics') {
            questions = basicsQuestions;
        } else if (theme === 'phrases') {
            questions = phrasesQuestions;
        } else if (theme === 'literature') {
            questions = literatureQuestions;
        }

        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        questionIndex = 0;
        score = 0;
        showQuestion(questions[questionIndex]);
    }

    topicButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-topic');
            startGame(theme);
        });
    });


    // Завдання 6 - Таймер
    function startTimer() {
        timer = 15;
        timerDisplay.innerText = `Час: ${timer}`;
        interval = setInterval(() => {
            timer--;

            // Safety check if element exists
            if (timerDisplay) timerDisplay.innerText = `Час: ${timer}`;

            if (timer <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }

    restartBtn.addEventListener('click', () => {
        // Show start screen again to let user pick difficulty if they want? 
        // Or just restart same game? Usually restart means same game.
        // But let's bring back to start screen to allow difficulty change.
        resultScreen.classList.add('hide');
        startScreen.classList.remove('hide');
    });

});

