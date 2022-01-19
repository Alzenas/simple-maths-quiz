// Place question into DOM
function displayQuestion() {
    const question = "This is a sample JavaScrip generated question";
    let answer = 54;
    const questionText = document.querySelector('#question');
    questionText.innerText = question;
    return {question, answer}
}

// Get an asnwer from DOM
function getAnswerFromHTML() {
    const givenAnswer = parseFloat(document.querySelector('#answer').value);
    return givenAnswer;
}

displayQuestion();