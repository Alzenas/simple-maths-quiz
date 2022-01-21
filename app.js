/*  /***************************\
    |   Math Exercises          |
    |   Year 2 Maths: Groups    |
    \***************************/

/****************************
    Define objects
*****************************/

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
/*   Define functions       */
/****************************/
function randInt(from, to, ...dontCare) {
    // Generates a random integer 
    // between 'from' and 'to' (inclusive)
    const default_rand = 100;
    if (arguments.length == 0) {
        // If neither 'from' or 'to' were defined
        // return random integer between 0 and 100 (inclusive)
        return Math.floor(Math.random() * (default_rand + 1));
    }
    else if (!to) {
        // If 'to' was not passed, return a random
        // integer from 0 and 'from'
        return Math.floor(Math.random() * (from + 1));
    }

    // both 'from' and 'to' were defined, then
    // return a random integer between 'from' and 'to'
    // (inclusive)
    const span = to - from;
    const rnd = Math.round(Math.random() * span);
    return (from + rnd);
}


// Returns a randomly selected item from the list
function choice(arr) {
    return arr[randInt(arr.length - 1)];
}

// Generate a random question
function generateQuestion(diffLevel = 1) {
    // Generate a random questions
    let question;
    let answer;

    let  minMultiplier;
    let maxMultiplier;
    let upperValue;
    let lowerValue;
    let first;
    let second;
    let min;
    let max;
    let text = [];

    switch (diffLevel) {
        case 1:
            minMultiplier = 2;  // Given as a variable for future control
            maxMultiplier = 10;  // Given as a variable for future control
            const numItems = randInt(minMultiplier, maxMultiplier);
            const itemPrice = randInt(minMultiplier, maxMultiplier);
            const randPerson = listOfPeople.pickPerson();
            const item = things.pickItem();
            const currencyName = 'Dirhams';

            question = `${randPerson.name} wants to buy some ${item.plural}. `;
            question += `If each ${item.name} costs ${itemPrice} ${currencyName}, `;
            question += `how many ${currencyName} does ${randPerson.pronoun()} need `;
            question += `to buy ${numItems} ${item.plural}?`;
            answer = itemPrice * numItems;
            break;

        case 2:
            upperValue = 50;
            lowerValue = 2;
            first = randInt(lowerValue, upperValue);
            second = randInt(lowerValue, upperValue);
            max = Math.max(first, second);
            min = Math.min(first, second);
            text = [];
            text.push({ question: `If we take that <span class="equation">X + ${min} = ${max},</span> which value of <span class="equation">X</span> would satisfy the equation? <p class="hint">(HINT: Which number do you need to add to ${min}, so that the final result is ${max}?)</p>`, answer: max - min });
            text.push({ question: `Given that <span class="equation">${max} - X = ${min},</span> which value of <span class="equation">X</span> would balance the equation? <p class="hint">(HINT: Which value needs to be subtracted from ${max} so that the final result is ${min}?)</p>`, answer: max - min });
            text.push({ question: `What is the value of <span class="equation">X</span> in the equation below? <p><span class="equation">${max} - ${min} = X</span></p><p class="hint">(HINT: Subtract ${min} from ${max} to get the answer.)</p>`, answer: max - min });
            text.push({
                question: `What is the value of <span class="equation">X</span> in the equation below?<p class="equation">${upperValue - max} + ${min} = X</p>
            <p class="hint">(HINT: Adding the numbers together would give you the result.)</p>`, answer: (upperValue - max) + min
            });

            // Destructure
            ({ question, answer } = choice(text));
            break;

        case 3:
            upperValue = 100;
            lowerValue = 10;
            first = randInt(lowerValue, upperValue);
            second = randInt(lowerValue, upperValue);
            max = Math.max(first, second);
            min = Math.min(first, second);
            text = [];
            text.push({ question: `If we take that <span class="equation">X + ${min} = ${max},</span> which value of <span class="equation">X</span> would satisfy the equation? <p class="hint">(HINT: Which number do you need to add to ${min}, so that the final result is ${max}?)</p>`, answer: max - min });
            text.push({ question: `Given that <span class="equation">${max} - X = ${min},</span> which value of <span class="equation">X</span> would balance the equation? <p class="hint">(HINT: Which value needs to be subtracted from ${max} so that the final result is ${min}?)</p>`, answer: max - min });
            text.push({ question: `What is the value of <span class="equation">X</span> in the equation below? <p><span class="equation">${max} - ${min} = X</span></p><p class="hint">(HINT: Subtract ${min} from ${max} to get the answer.)</p>`, answer: max - min });
            text.push({
                question: `What is the value of <span class="equation">X</span> in the equation below?<p class="equation">${upperValue - max} + ${min} = X</p>
                <p class="hint">(HINT: Adding the numbers together would give you the result.)</p>`, answer: (upperValue - max) + min
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
}

// Insert new question into the document
function insertNewQuestion({ question, answer }, selectorId = 'question') {
    const inSection = document.querySelector('.qcontainer');
    const p = document.createElement('p');
    p.id = selectorId;
    p.innerHTML = `<span class="questiontitle">Question ${currentQuestion}.</span>` + question;
    inSection.appendChild(p);

    const answerBox = document.querySelector('#answer');
    answerBox.value = '';
    answerBox.focus();

    currentQuestion++;

    return { question, answer };
}


// Insert a correct answer into document model
function insertCorrectAnswer({ question, answer }, selectorId = 'correctanswer') {
    const inSection = document.querySelector('.qcontainer');
    const p = document.createElement('p');
    p.classList.add(selectorId);
    p.innerHTML = `<span class='correctiontext'>${getAnswerFromHTML()}</span> is not a correct answer. The correct answer was: <span class='correctiontext'>${answer}</span>.`;
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
    if (!isNaN(htmlAnswer)) {
        if (htmlAnswer) {
            markLastQuestion('correct');
            correctAnswers++;
        }
        else {
            markLastQuestion('wrong');
            wrongAnswers++;
            maxQuestions++;
            insertCorrectAnswer(questionAsked);
        }
        if (currentQuestion <= maxQuestions) {
            setDifficultyLevel();
            questionAsked = generateQuestion(difficulty)
            insertNewQuestion(questionAsked);
            questionsRemainingMessage();
        }
        else {
            endOfPlay();
        }
    }
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
    p.classList.add('endofplay');
    let = finalMessage = `This was the last question of this round. `;
    finalMessage += `Your final score is: <span id='finalscore'>${score}%</span>.`;
    p.innerHTML = finalMessage;
    inSection.appendChild(p);

    // Disable current button, answer box and answer label
    answerButton = document.querySelector('button.bigbutton');
    answerBox = document.querySelector('#answer');
    answerLabel = document.querySelector('label[for="answer"]');
    answerButton.hidden = true;
    answerBox.hidden = true;
    answerLabel.style.visibility = 'collapse';

    // Add new button for continuation of play, 
    // to ask the user if they want to continue
    addBigButton();
}

function addBigButton(text = 'Continue?') {
    // Select the paragraph to which the big button will be added
    inSection = document.querySelector('main section:last-of-type p');

    // create a new big button
    const newButton = document.createElement('button');
    newButton.classList.add('bigbutton');
    newButton.id = 'continuebutton'
    newButton.innerText = text;
    inSection.appendChild(newButton);
    newButton.focus();

    // Define onclick action for the button
    newButton.addEventListener('click', () => continuePlay());
}


function continuePlay() {
    // remove continuation button
    const inSection = document.querySelector('main section:last-of-type p');
    const contButton = document.querySelector('#continuebutton');
    contButton.removeEventListener('click', () => continuePlay());
    inSection.removeChild(contButton);

    // Remove last score details
    const scoreText = document.querySelector('.qbox p.endofplay');
    const questionParas = document.querySelector('.qcontainer')
    questionParas.removeChild(scoreText);

    // enable confirmation button
    const confButton = inSection.querySelector('button.bigbutton');
    confButton.hidden = false;

    // show previusly hidden button, answer box and answer label
    answerBox = document.querySelector('#answer');
    answerLabel = document.querySelector('label[for="answer"]');
    answerBox.hidden = false;
    answerLabel.style.visibility = 'visible';

    // Set counters 
    maxQuestions += questionsInRound;

    // Insert new question
    setDifficultyLevel();
    questionAsked = generateQuestion(difficulty);
    insertNewQuestion(questionAsked);
    questionsRemainingMessage();
}

function setQuestionsInRound() {
    questionsInRound = parseInt(document.querySelector('#questionsperround').value);
    maxQuestions = questionsInRound;
    return questionsInRound;
}

function setDifficultyLevel() {
    difficulty = document.querySelector('#difficultylevel').value;
    if (difficulty != 'mixed') {
        difficulty = parseInt(difficulty);
        return difficulty;
    }
    // Otherwise, mix difficulty levels
    difficulty = randInt(1, 3);
    return difficulty;
}

function showMainArticle(show = true) {
    // Show/Hide article
    article = document.querySelector('.qbox');
    article.style.visibility = show ? 'visible' : 'collapse'
    return article;
}

function showSetUp(show = true) {
    // Show/Hide set up box
    aside = document.querySelector('.sbox');
    aside.style.visibility = show ? 'visible' : 'collapse'

    if(show) {
        // focus on player's name
        aside.querySelector('#playername').focus();
    }
    return aside;
}


function startPlay() {
    showMainArticle(true);
    showSetUp(false);

    setDifficultyLevel();
    questionAsked = generateQuestion(difficulty);
    insertNewQuestion(questionAsked);
    document.querySelector('#answer').focus();

    setQuestionsInRound();
    questionsRemainingMessage();
}


function questionsRemainingMessage() {
    const text = document.querySelector('#remainingquestions');
    const num = maxQuestions - currentQuestion + 2;
    let ansText = num > 1 ? 'answers' : 'answer';
    text.innerText = `${num} more correct ${ansText} required to complete this round.`;
    return num;
}

let questionsInRound = 2;
let maxQuestions = questionsInRound;
let correctAnswers = 0;
let wrongAnswers = 0;
let currentQuestion = 1;
let questionAsked;
let difficulty;

/****************************** */
/* Set event listeners/handlers */
/****************************** */

// For when difficulty level is changed
diffLevelDropDown = document.querySelector('#difficultylevel');
diffLevelDropDown.addEventListener('change', () => setDifficultyLevel());

// For when questions per round is changed
questPerRoundNumber = document.querySelector('#questionsperround');
questPerRoundNumber.addEventListener('change', () => setQuestionsInRound());

// When on-page start button is clicked
startButton = document.querySelector('#startbutton');
startButton.addEventListener('click', () => startPlay());

// When Enter is pressed after user inserts the answer
answerInput = document.querySelector('#answer');
answerInput.addEventListener('keypress', (key) => {
    // If either Enter or Space are pressed, then click the button
    if (['enter', 'space'].indexOf(key.code.toLowerCase()) != -1) {
        // click answerButton
        answerButton.click();
    }
});

// When confirm answer button is pressed
answerButton = document.querySelector('#confirmanswer');
answerButton.addEventListener('click', () => checkAnswer());


/***************************************/
/* Stuff to run upon loading the page  */
/***************************************/

// Hide main article initially
showMainArticle(false);

// Show set up 
showSetUp(true);

questionsRemainingMessage();