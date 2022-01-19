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
        'roll of paper, paper rolls'
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
        'Tata'
    ],
    femaleNames: [
        'Mira',
        'Sophia',
        'Tatiana',
        'Alice',
        'Tammy',
        'Mom',
        'Tara',
        'Sara',
        'Emmy',
        'Natasha'
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


/****************************
    Define functions
*****************************/
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


// Generate a random question
function generateQuestion(diffLevel = 1) {
    // Generate a random question
    const randPerson = listOfPeople.pickPerson();
    const item = things.pickItem();
    const numItems = randInt(2, 10);
    const itemPrice = randInt(2, 10);
    const currencyName = 'Dirhams';

    let text = `${randPerson.name} wants to buy some ${item.plural}. `;
    text += `If each ${item.name} costs ${itemPrice} ${currencyName}, `;
    text += `how many ${currencyName} does ${randPerson.pronoun()} need `;
    text += `to buy ${numItems} ${item.plural}?`

    // Return correct answer
    return { question: text, answer: itemPrice * numItems };
}


// Mark last question as correct or wrong based on arguments passed
function markLastQuestion(statusId = 'correct') {
    // Select last paragraph in .questions section:
    question = document.querySelector('.questions p:last-child')
    question.classList.add(statusId);
    question.id = '';
}

// Insert new question into the document
function insertNewQuestion({ question, answer }, selectorId = 'question') {
    const inSection = document.querySelector('.questions');
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
    const inSection = document.querySelector('.questions');
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
            questionAsked = generateQuestion()
            insertNewQuestion(questionAsked);
        }
        else {
            endOfPlay();
        }
    }
    const answerBox = document.querySelector('#answer');
    answerBox.value = '';
    answerBox.focus();
}


function endOfPlay() {
    const score = Math.round(100 * (correctAnswers / maxQuestions), 0);
    const inSection = document.querySelector('.questions');
    const p = document.createElement('p');
    p.classList.add('endofplay');
    let = finalMessage =  `This was the last question of this round. `;
    finalMessage += `Your final score is: <span id='finalscore'>${score}%</span>.`;
    p.innerHTML = finalMessage;
    inSection.appendChild(p);
}


let maxQuestions = 2;
let correctAnswers = 0;
let wrongAnswers = 0;
let currentQuestion = 1;
let questionAsked = generateQuestion();

if (document.body.classList.contains('mathquestions')) {
    insertNewQuestion(questionAsked);
    document.querySelector('#answer').focus();
}
