document.addEventListener('DOMContentLoaded', () => {
    const quizQuestionElem = document.getElementById('quiz-question');
    const quizOptionsElem = document.getElementById('quiz-options');
    const quizFeedbackElem = document.getElementById('quiz-feedback');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');

    let currentQuestionIndex = 0;
    let quizActive = false;

    // Hangul quiz questions (Hangul character, correct Romanization, some incorrect options)
    const hangulQuizQuestions = [
        { char: "ㄱ", correct: "g/k", options: ["n", "d/t", "g/k", "r/l"] },
        { char: "ㄴ", correct: "n", options: ["m", "s", "n", "j"] },
        { char: "ㄷ", correct: "d/t", options: ["b/p", "d/t", "ch", "h"] },
        { char: "ㄹ", correct: "r/l", options: ["p", "r/l", "t", "s"] },
        { char: "ㅁ", correct: "m", options: ["m", "b/p", "n", "j"] },
        { char: "ㅂ", correct: "b/p", options: ["d/t", "ch", "b/p", "h"] },
        { char: "ㅅ", correct: "s", options: ["s", "k", "t", "p"] },
        { char: "ㅇ", correct: "ng / silent", options: ["ng / silent", "j", "ch", "h"] },
        { char: "ㅈ", correct: "j", options: ["j", "t", "p", "h"] },
        { char: "ㅊ", correct: "ch", options: ["ch", "k", "t", "p"] },
        { char: "ㅋ", correct: "k", options: ["n", "k", "d/t", "m"] },
        { char: "ㅌ", correct: "t", options: ["s", "t", "j", "ch"] },
        { char: "ㅍ", correct: "p", options: ["b/p", "m", "p", "f"] },
        { char: "ㅎ", correct: "h", options: ["s", "h", "j", "ch"] }
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function initializeQuiz() {
        currentQuestionIndex = 0;
        shuffleArray(hangulQuizQuestions); // Shuffle questions each time
        quizFeedbackElem.textContent = '';
        quizFeedbackElem.className = '';
        startQuizBtn.style.display = 'block';
        nextQuestionBtn.style.display = 'none';
        quizQuestionElem.textContent = 'ກົດປຸ່ມ "ເລີ່ມ Quiz" ເພື່ອເລີ່ມຕົ້ນ!';
        quizOptionsElem.innerHTML = ''; // Clear options
        quizActive = false;
    }

    function displayQuestion() {
        if (currentQuestionIndex < hangulQuizQuestions.length) {
            const questionData = hangulQuizQuestions[currentQuestionIndex];
            quizQuestionElem.textContent = `ພະຍັນຊະນະ: "${questionData.char}" ແມ່ນສຽງໃດ?`;
            quizFeedbackElem.textContent = '';
            quizFeedbackElem.className = '';
            
            quizOptionsElem.innerHTML = ''; // Clear old options
            shuffleArray(questionData.options); // Shuffle options for the current question
            questionData.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.dataset.value = option;
                button.addEventListener('click', handleAnswer);
                quizOptionsElem.appendChild(button);
            });

            quizActive = true;
        } else {
            quizQuestionElem.textContent = 'ຈົບ Quiz ແລ້ວ! ຍິນດີດ້ວຍ!';
            quizOptionsElem.style.display = 'none';
            nextQuestionBtn.style.display = 'none';
            startQuizBtn.textContent = 'ເລີ່ມ Quiz ໃໝ່';
            startQuizBtn.style.display = 'block';
            quizActive = false;
        }
    }

    function handleAnswer(event) {
        if (!quizActive) return;

        const selectedOption = event.target.dataset.value;
        const correctOption = hangulQuizQuestions[currentQuestionIndex].correct;

        disableOptions(true); // Disable options after selection
        quizActive = false;

        if (selectedOption === correctOption) {
            quizFeedbackElem.textContent = 'ຖືກຕ້ອງ!';
            quizFeedbackElem.classList.add('correct');
        } else {
            quizFeedbackElem.textContent = `ຜິດ! ຄໍາຕອບທີ່ຖືກຕ້ອງແມ່ນ: "${correctOption}".`;
            quizFeedbackElem.classList.add('incorrect');
        }

        if (currentQuestionIndex < hangulQuizQuestions.length - 1) {
            nextQuestionBtn.style.display = 'block';
        } else {
            startQuizBtn.textContent = 'ເລີ່ມ Quiz ໃໝ່';
            startQuizBtn.style.display = 'block';
            nextQuestionBtn.style.display = 'none';
        }
    }

    function disableOptions(disabled) {
        Array.from(quizOptionsElem.children).forEach(button => {
            if (disabled) {
                button.classList.add('disabled');
                button.removeEventListener('click', handleAnswer);
            } else {
                button.classList.remove('disabled');
                button.addEventListener('click', handleAnswer); // Re-add listener if enabling
            }
        });
    }

    // Event Listeners
    startQuizBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        quizOptionsElem.style.display = 'flex'; // Ensure options are visible
        startQuizBtn.style.display = 'none';
        shuffleArray(hangulQuizQuestions); // Shuffle questions for a fresh quiz
        displayQuestion();
    });

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        nextQuestionBtn.style.display = 'none';
        displayQuestion();
    });

    initializeQuiz();
});
