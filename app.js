/*  /***************************\
    |   Math Exercises          |
    |   Year 2 Maths: Groups    |
    \***************************/

/*******************************/
/*    Define objects           */
/*******************************/

class thing {
    constructor(name, plural) {
        this.name = name;
        this.plural = plural;
    }
}

const things = {
    items: [
        'tomato, tomatoes',
        'potato, potatoes',
        'banana, bananas',
        'carrot, carrots',
        'cabbage, cabbages',
        'onion, onions',
        'pepper, peppers',
        'apple, apples',
        'pear, pears',
        'pineapple, pineapples',
        'avocado, avocados',
        'box of strawberries, boxes of strawberries',
        'bottle of milk, bottles of milk',
        'bottle of juice, bottles of juice',
        'watermelon, watermelons',
        'melon, melons',
        'pumpkin, pumpkins',
        'pencil, pencils',
        'notebook, notebooks',
        'desk chair, desk chairs',
        'roll of paper, paper rolls',
        'picture frame, picture frames',
        'buildable drawer, buildable drawers',
        'computer game, games',
        'Ludo set, Ludo sets',
        'envelope, envelopes',
        'post mark, post marks',
        'pillow, pillows',
        'monitor stand, stands for computer monitors'
    ],
    listOfItems: [],

    initialiseItems() {
        this.items.forEach((element) => {
            const singular = element.split(', ')[0];
            const plural = element.split(', ')[1];
            this.listOfItems.push(new thing(singular, plural));
        });
    },

    pickItem() {
        return this.listOfItems[randInt(this.listOfItems.length - 1)];
    }
}
things.initialiseItems();

class person {
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
    }
    pronoun() {
        return this.gender[0].toLowerCase() == 'm' ? 'he' : 'she';
    }
    genitive() {
        return this.gender[0].toLowerCase() == 'm' ? 'his' : 'her';
    }
}

const listOfPeople = {
    maleNames: [
        'John',
        'Jon',
        'Tom',
        'Aleks',
        'Zen',
        'Hamoudi',
        'Akram',
        'Walid',
        'Amir',
        'Tata',
        'Leo',
        'Rafi',
        'Themmis',
        'Jovan',
        'Igor',
        'Marko',
        'Aleksandar',
        'Anthony',
        'Thomas',
        'Mazen',
        'Sasha',
        'Boki',
        'Dragan'
    ],
    femaleNames: [
        'Mira',
        'Mom',
        'Tania',
        'Anna',
        'Elham',
        'Sophia',
        'Tatiana',
        'Alice',
        'Tammy',
        'Mom',
        'Tara',
        'Sara',
        'Emmy',
        'Natasha',
        'Baka',
        'Sofija',
        'Sophia',
        'Ivana',
        'Layla',
        'Sue',
        'Martha',
        'Bojana',
        'Dana',
        'Alma',
        'Lara',
        'Claire'
    ],

    people: [],

    initialisePeople() {
        for (mName of this.maleNames) {
            this.people.push(new person(mName, 'Male'));
        }
        for (fName of this.femaleNames) {
            this.people.push(new person(fName, 'Female'));
        }
    },

    pickPerson() {
        // Select a random name
        return this.people[randInt(this.people.length - 1)];
    },

    shuffleNames() {
        // Return an array of random male and female names
        const numNames = this.people.length - 1;
        people = this.people;
        for (let i = numNames; i > 0; i--) {
            const rnd = randInt(i - 1);
            [people[i], people[rnd]] = [people[rnd], people[i]];
        }
    }
}
listOfPeople.initialisePeople();
listOfPeople.shuffleNames();


/****************************/
/*   Define parameters      */
/****************************/
let maxQuestions = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let currentQuestion = 1;
let questionAsked;
const quizForm = {
    '#player-name': '',
    '#quiz-type': '',
    '#questions-per-round': '',
    '#keep-score': false
};


/****************************/
/*   Define functions       */
/****************************/

// Generate a random integer
function randInt(from, to, ...dontCare) {

    // Generates a random integer between 'from' and 'to' (inclusive)
    const default_rand = 100;
    if (arguments.length == 0) {
        // If neither 'from' or 'to' were defined
        // return random integer between 0 and 100 (inclusive)
        return Math.floor(Math.random() * (default_rand + 1));
    }
    else if (!to) {
        // If 'to' was not passed, return a random integer from 0 and 'from'
        return Math.floor(Math.random() * (from + 1));
    }

    // if both 'from' and 'to' were defined, 
    // then return a random integer between 'from' and 'to'(inclusive)
    const span = to - from;
    const rnd = Math.round(Math.random() * span);
    return (from + rnd);
}

// Returns a randomly selected item from the list
function choice(arr) {
    return arr[randInt(arr.length - 1)];
}

// Generate a random question
function generateQuestion(quizType = 1) {
    // Define required parameters
    let question;
    let answer;

    let minMultiplier;
    let maxMultiplier;
    let upperValue;
    let lowerValue;
    let first;
    let second;
    let min;
    let max;
    let text = [];

    let numItems;
    let itemPrice;
    let randPerson;
    let item; 
    let currencyName;

    switch (quizType) {
        case 1:
            minMultiplier = 2;  // Given as a variable for future control
            maxMultiplier = 10;  // Given as a variable for future control
            numItems = randInt(minMultiplier, maxMultiplier);
            itemPrice = randInt(minMultiplier, maxMultiplier);
            randPerson = listOfPeople.pickPerson();
            item = things.pickItem();
            currencyName = 'Dirhams';

            question = `${randPerson.name} wants to buy some ${item.plural}. `;
            question += `If each ${item.name} costs ${itemPrice} ${currencyName}, `;
            question += `how many ${currencyName} does ${randPerson.pronoun()} need `;
            question += `to buy ${numItems} ${item.plural}?`;

            // Add a hint
            question += `<p class="hint">HINT: ${numItems}&nbsp;&times;&nbsp;${itemPrice} (${numItems} multiplied by ${itemPrice})</p>`;

            answer = itemPrice * numItems;
            break;

        case 2:
            minMultiplier = 2;  // Given as a variable for future control
            maxMultiplier = 10;  // Given as a variable for future control
            numItems = randInt(minMultiplier, maxMultiplier);
            itemPrice = randInt(minMultiplier, maxMultiplier);
            randPerson = listOfPeople.pickPerson();
            item = things.pickItem();
            currencyName = 'Dirhams';

            const total = itemPrice * numItems;

            question = `${randPerson.name} has ${numItems} ${item.plural}, `;
            question += `for which ${randPerson.pronoun()} paid ${total} `;
            question += `${currencyName} in total. `;
            question += `What is the price (in ${currencyName}), of each ${item.name}?`;

            // Add a hint
            question += `<p class="hint">HINT: <br>How many ${numItems}\'s are there in a ${total}? <br>In other words, what is ${total} divided by ${numItems}? <br>Or, what is the result of ${total} &div; ${numItems}?</p>`;

            answer = itemPrice;
            break;

        case 3:
            upperValue = 50;
            lowerValue = 2;
            first = randInt(lowerValue, upperValue);
            second = randInt(lowerValue, upperValue);
            max = Math.max(first, second);
            min = Math.min(first, second);
            text = [];
            text.push({ question: `If we take that <span class="equation">X + ${min} = ${max},</span> which value of <span class="equation">X</span> would satisfy the equation? <p class="hint">HINT: <br>Which number do you need to add to ${min}, so that the final result is ${max}?</p>`, answer: max - min });
            text.push({ question: `Given that <span class="equation">${max} - X = ${min},</span> which value of <span class="equation">X</span> would balance the equation? <p class="hint">HINT: <br>Which value needs to be subtracted from ${max} so that the final result is ${min}?</p>`, answer: max - min });
            text.push({ question: `What is the value of <span class="equation">X</span> in the equation below? <p><span class="equation">${max} - ${min} = X</span></p><p class="hint">HINT: <br>Subtract ${min} from ${max} to get the answer.</p>`, answer: max - min });
            text.push({
                question: `What is the value of <span class="equation">X</span> in the equation below?<p class="equation">${upperValue - max} + ${min} = X</p>
            <p class="hint">HINT: <br>Adding the numbers together would give you the result.</p>`, answer: (upperValue - max) + min
            });

            // Destructure
            ({ question, answer } = choice(text));
            break;

        case 4:
            upperValue = 100;
            lowerValue = 10;
            first = randInt(lowerValue, upperValue);
            second = randInt(lowerValue, upperValue);
            max = Math.max(first, second);
            min = Math.min(first, second);
            text = [];
            text.push({ question: `If we take that <span class="equation">X + ${min} = ${max},</span> which value of <span class="equation">X</span> would satisfy the equation? <p class="hint">HINT: <br>Which number do you need to add to ${min}, so that the final result is ${max}?</p>`, answer: max - min });
            text.push({ question: `Given that <span class="equation">${max} - X = ${min},</span> which value of <span class="equation">X</span> would balance the equation? <p class="hint">HINT: <br>Which value needs to be subtracted from ${max} so that the final result is ${min}?</p>`, answer: max - min });
            text.push({ question: `What is the value of <span class="equation">X</span> in the equation below? <p><span class="equation">${max} - ${min} = X</span></p><p class="hint">HINT: <br>Subtract ${min} from ${max} to get the answer.</p>`, answer: max - min });
            text.push({
                question: `What is the value of <span class="equation">X</span> in the equation below?<p class="equation">${upperValue - max} + ${min} = X</p>
                <p class="hint">HINT: <br>Adding the numbers together would give you the result.</p>`, answer: (upperValue - max) + min
            });

            // Destructure
            ({ question, answer } = choice(text));
            break;

        default:
    }

    // Return correct answer
    return { question, answer };
}

// Mark last question as correct or wrong based on arguments passed
function markLastQuestion(statusId = 'correct') {
    // Select last paragraph in .qcontainer section:
    question = document.querySelector('#question')
    question.classList.add(statusId);
    question.id = '';

    //  And remove event listeners on this object
    question.removeEventListener('click', toggleHint, true);
    question.removeEventListener('mouseout', hideHint, true);
}

// Insert new question into the document
function insertNewQuestion({ question, answer }, selectorId = 'question') {
    const inSection = document.querySelector('.qcontainer');
    const p = document.createElement('p');
    p.id = selectorId;
    p.innerHTML = `<span class="question-title">Question ${currentQuestion}.</span>` + question;
    inSection.appendChild(p);

    // Clear the answer box and focus upon it
    const answerBox = document.querySelector('#answer');
    answerBox.value = '';
    answerBox.focus();

    currentQuestion++;

    // Add event listener for a hint
    p.addEventListener('click', toggleHint, true);
    p.addEventListener('mouseout', hideHint, true);

    return { question, answer };
}

// Insert a correct answer into document model
function insertCorrectAnswer(answer, className = 'correct-answer') {
    const inSection = document.querySelector('.qcontainer');
    const p = document.createElement('p');
    p.classList.add(className);
    p.innerHTML = `<span class='correction-text'>${getAnswerFromHTML()}</span> is not a correct answer. The correct answer was: <span class='correction-text'>${answer}</span>.`;
    inSection.appendChild(p);
}

// Get user's answer from document model
function getAnswerFromHTML() {
    const givenAnswer = parseFloat(document.querySelector('#answer').value);
    return givenAnswer;
}

// Check if answer given by the user is correct
function isAnswerCorrect() {
    const response = getAnswerFromHTML();
    if (isNaN(response)) {
        return response;
    }
    return response === questionAsked.answer;
}

// Provide a response to user's answer
function checkAnswer() {
    const htmlAnswer = isAnswerCorrect();

    // If the response was not nothing:
    if (!isNaN(htmlAnswer)) {

        // if correct answer was given
        if (htmlAnswer) {
            markLastQuestion('correct');
            correctAnswers++;
        }
        // if wrong answer was given
        else {
            markLastQuestion('wrong');
            wrongAnswers++;
            maxQuestions++;
            insertCorrectAnswer(questionAsked.answer);
        }

        // Check if the maximum number of qustions is reached
        if (currentQuestion <= maxQuestions) {
            let quizType = getQuizType();
            questionAsked = generateQuestion(quizType);
            insertNewQuestion(questionAsked);
            questionsRemainingMessage();
        }
        // and if it has, call 'end of play'
        else {
            endOfPlay();
        }
    }

    // Clear the answer box and focus upon it
    const answerBox = document.querySelector('#answer');
    answerBox.value = '';
    answerBox.focus();
}

// Runs when the last question of the round was done
function endOfPlay() {
    // Prepare a message
    const score = Math.round(100 * (correctAnswers / maxQuestions), 0);
    const inSection = document.querySelector('.qcontainer');
    const p = document.createElement('p');
    p.classList.add('end-of-play');
    let = finalMessage = `This was the last question of this round. `;
    finalMessage += `Your final score is: <span id='final-score'>${score}%</span>.`;
    p.innerHTML = finalMessage;
    inSection.appendChild(p);

    // Disable current button, answer box and answer label
    answerButton = document.querySelector('button.big-button');
    answerBox = document.querySelector('#answer');
    answerLabel = document.querySelector('label[for="answer"]');
    answerButton.hidden = true;
    answerBox.hidden = true;
    answerLabel.style.visibility = 'collapse';

    // Add new button for continuation of play (Continue?)
    addBigButton('Another round?');
}

// Add Continue Play? button to the page
function addBigButton(text = 'Continue?') {
    // Select the paragraph to which the big button will be added
    const inSection = document.querySelector('main section:last-of-type p');

    // create a new big button
    const newButton = document.createElement('button');
    newButton.classList.add('big-button');
    newButton.id = 'continue-button'
    newButton.innerText = text;
    inSection.appendChild(newButton);
    newButton.focus();

    // Listen on the newly created button
    newButton.addEventListener('click', continuePlay, true);
}

// Extend the quiz by another round
function continuePlay() {
    // remove continuation button
    const inSection = document.querySelector('main section:last-of-type p');
    const contButton = document.querySelector('#continue-button');
    contButton.removeEventListener('click', continuePlay, true);
    inSection.removeChild(contButton);

    // Remove last score details
    const scoreText = document.querySelector('.questions-box p.end-of-play');
    const questionParas = document.querySelector('.qcontainer')
    questionParas.removeChild(scoreText);

    // enable confirmation button
    const confButton = inSection.querySelector('button.big-button');
    confButton.hidden = false;

    // Show previusly hidden button, answer box and answer label
    answerBox = document.querySelector('#answer');
    answerLabel = document.querySelector('label[for="answer"]');
    answerBox.hidden = false;
    answerLabel.style.visibility = 'visible';

    // Also, increase the max number of questions
    maxQuestions += parseInt(quizForm['#questions-per-round']);

    // Insert new question
    let quizType = getQuizType();
    questionAsked = generateQuestion(quizType);
    insertNewQuestion(questionAsked);

    // and update the message about remaining questions
    questionsRemainingMessage();
}

// Gets a quiz type from quiz settings form
function getQuizType() {
    // Unless quiz type is mixed, return an integer value from the form
    if (quizForm['#quiz-type'] != 'mixed') {
        return parseInt(quizForm['#quiz-type']);
    }
    // Otherwise, return a random quiz type
    let randomQuizTypeIndex = choice(listQuizTypes('mixed')).index;
    return randomQuizTypeIndex;
}

// Show or hide main questions content
function showMainArticle(show = true) {
    article = document.querySelector('.questions-box');
    article.style.visibility = show ? 'visible' : 'collapse'

    // Set the order of items in flex container if this item is shown
    const container = document.querySelector('main');
    container.style.flexDirection = show ? 'column' : 'column-reverse';

    return article;
}

// Show or hide quiz settings form
function showSetUp(show = true) {
    const aside = document.querySelector('.settings-box');
    aside.style.visibility = show ? 'visible' : 'collapse'

    // Set the order of items in flex container if this item is shown
    const container = document.querySelector('main');
    container.style.flexDirection = !show ? 'column' : 'column-reverse';

    // focus on player's name
    if (show) {
        aside.querySelector('#player-name').focus();
    }
    return aside;
}

// Start the quiz
function startPlay() {
    // Show questions content and hide quiz settings form
    showMainArticle(true);
    showSetUp(false);

    maxQuestions = parseInt(quizForm['#questions-per-round']);
    questionAsked = generateQuestion(getQuizType());
    insertNewQuestion(questionAsked);

    // Focus on answer box
    document.querySelector('#answer').focus();

    // and update the 'questions remaining' message
    questionsRemainingMessage();
}

// Calculate the number of remaining questions and update the message
function questionsRemainingMessage() {
    const text = document.querySelector('#remaining-questions');
    const num = maxQuestions - currentQuestion + 2;
    let plural = num > 1 ? 's' : '';
    text.innerText = `Answer ${num} more question${plural} correctly to complete this round.`;
    return num;
}

// List of quiz type indices
function listQuizTypes(exclude='') {
    const arr = [];
    const quizTypes = document.querySelectorAll('#quiz-type option');
    quizTypes.forEach((option, index) => {
        if (!option.disabled && option.value !== exclude) {
            arr.push({index: index, label: option.label});
        }
    });
    return arr;
}

// Show or Hide hints
function toggleHint() {
    const hintPara = document.querySelector('#question p:last-child');
    hintPara.style.opacity = hintPara.style.opacity == 0 ? 1 : 0;
}

function hideHint() {
    const hintPara = document.querySelector('#question p:last-child');
    hintPara.style.opacity = 0;
}

/****************************** */
/* Set event listeners/handlers */
/****************************** */

// Listen for a quiz form submit button and update quizForm dictionary
const settingsForm = document.querySelector('#settings-form');
settingsForm.addEventListener('submit', (evnt) => {
    evnt.preventDefault();
    // Update quizForm dictionary
    for (let key in quizForm) {
        const target = document.querySelector(key);
        const condition = target.type === 'checkbox'; 
        quizForm[key] = condition ? target.checked : target.value;
    }
    // begin
    startPlay();
});

// Listen for 'Enter' or 'Space' after user inserts their answer
answerInput = document.querySelector('#answer');
answerInput.addEventListener('keypress', (key) => {
    if (['enter', 'space'].indexOf(key.code.toLowerCase()) != -1) {
        checkAnswer();
    }
});

// Listen for button press after answer is inserted
answerButton = document.querySelector('#confirmanswer');
answerButton.addEventListener('click', () => checkAnswer());



/***************************************/
/* Stuff to run upon loading the page  */
/***************************************/

// Hide main article initially
showMainArticle(false);

// Show quiz settings form
showSetUp(true);

// Update the number of questions remaining
questionsRemainingMessage();