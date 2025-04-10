const questions = [
    {
        question: "1. What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: 2
    },
    {
        question: "2. What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: 1
    },
    {
        question: "3. Which planet is known as the Red Planet?",
        options: ["Earth", "Venus", "Mars", "Jupiter"],
        answer: 2
    },
    {
        question: "4. What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
        answer: 1
    },
    {
        question: "5. Which element is needed for combustion?",
        options: ["Oxygen", "Carbon", "Nitrogen", "Hydrogen"],
        answer: 0
    },
    {
        question: "6. What is the smallest prime number?",
        options: ["1", "2", "3", "5"],
        answer: 1
    },
    {
        question: "7. Which country is home to the kangaroo?",
        options: ["India", "Australia", "South Africa", "Brazil"],
        answer: 1
    },
    {
        question: "8. What is the boiling point of water?",
        options: ["90°C", "100°C", "110°C", "120°C"],
        answer: 1
    },
    {
        question: "9. What is the largest desert in the world?",
        options: ["Sahara", "Gobi", "Antarctic", "Kalahari"],
        answer: 2
    },
    {
        question: "10. Who painted the Mona Lisa?",
        options: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: 2
    },
    {
        question: "11. What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Pb", "Hg"],
        answer: 0
    },
    {
        question: "12. Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "Leo Tolstoy", "Mark Twain", "William Shakespeare"],
        answer: 3
    },
    {
        question: "13. What is the fastest land animal?",
        options: ["Lion", "Elephant", "Cheetah", "Horse"],
        answer: 2
    },
    {
        question: "14. Which is the longest river in the world?",
        options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
        answer: 0
    },
    {
        question: "15. Which planet is closest to the Sun?",
        options: ["Earth", "Venus", "Mercury", "Mars"],
        answer: 2
    },
    {
        question: "16.Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        answer: 2
    },
    {
        question: "17. What is the main ingredient in sushi?",
        options: ["Rice", "Fish", "Seaweed", "Soy Sauce"],
        answer: 0
    },
    {
        question: "18. Which element has the atomic number 1?",
        options: ["Oxygen", "Hydrogen", "Helium", "Nitrogen"],
        answer: 1
    },
    {
        question: "19. What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Pacific", "Arctic"],
        answer: 2
    },
    {
        question: "20. Which city hosted the 2016 Summer Olympics?",
        options: ["Tokyo", "Rio de Janeiro", "London", "Beijing"],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;

// Get references to the HTML elements
const startButton = document.querySelector('.start_btn button');
const infoBox = document.querySelector('.info_box');
const continueButton = document.querySelector('.continue');
const quizBox = document.querySelector('.quiz-body');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
const timerElement = document.getElementById('timer');

// Start button event listener
startButton.addEventListener('click', () => {
    document.querySelector('.start_btn').style.display = 'none'; // Hide start button
    infoBox.style.display = 'block'; // Show info box
});

// Continue button event listener in info box
continueButton.addEventListener('click', () => {
    infoBox.style.display = 'none'; // Hide info box
    quizBox.style.display = 'block'; // Show quiz box
    startQuiz(); // Start quiz logic here
});

// Start Quiz function
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0; // Reset score
    loadQuestion(currentQuestionIndex);
}

// Load a question based on the current index
function loadQuestion(index) {
    clearInterval(timerInterval); // Clear any existing timer
    startTimer(15); // Restart the timer for each new question

    const question = questions[index];
    questionElement.textContent = question.question;

    // Clear previous options
    optionsElement.innerHTML = '';

    // Add options as buttons
    question.options.forEach((option, i) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(i, question.answer));
        optionsElement.appendChild(button);
    });

    // Show/hide previous button
    previousButton.style.display = index === 0 ? 'none' : 'inline-block';
}

// Check the answer and move to the next question
function checkAnswer(selectedIndex, correctIndex) {
    // Disable all option buttons after one is clicked
    const optionButtons = optionsElement.querySelectorAll('button');
    optionButtons.forEach(button => button.disabled = true);

    // Check if the selected option is correct
    if (selectedIndex === correctIndex) {
        score++; // Increment score only if the answer is correct
    }

    // Move to the next question after a short delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion(currentQuestionIndex);
        } else {
            endQuiz();
        }
    }, 1000); // Delay allows the user to see whether they were correct
}

// End the quiz and display the score
function endQuiz() {
    clearInterval(timerInterval); // Stop the timer when the quiz ends
    quizBox.innerHTML = `<h2>Quiz Complete!</h2><h2>Your Score: ${score}/${questions.length}</h2>`;
}

// Timer function
function startTimer(seconds) {
    let timeLeft = seconds;
    timerElement.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            // Move to next question when time is up
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion(currentQuestionIndex);
            } else {
                endQuiz();
            }
        }
    }, 1000);
}

// Previous button event listener
previousButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

// Next button event listener
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});
