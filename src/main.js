const questionContainer = document.querySelector(".questions-container");

let urlQ = "http://localhost:3000/questions";

const fetchQ = async ()=> {
    try {
        const response = await fetch(urlQ, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        })
        return response.json();
    }catch(e){
        console.log(e)
    }
}

var questions = [];
let filteredQuestions =[];

document.addEventListener('DOMContentLoaded', async()=>{
    console.log(localStorage.getItem('surveyId'))
    questions = await fetchQ();
    console.log(questions)
    filteredQuestions = questions.filter(question=>question.surveyId === localStorage.getItem('surveyId'))
    console.log(filteredQuestions);
    dummyQuestions=filteredQuestions.map(record=>({
           question: record.Question,
           type: record.questionType,
           questionId:record.Id,
           
    })
    )

    let questionViews = "";




    dummyQuestions.forEach(({ question, questionId, type }, index) => {
      questionViews += questionsGenerator(question, type, questionId, index + 1);
    });
    questionContainer.innerHTML = questionViews;
    
    })


const questionTypes = Object.freeze({
  input: 0,
  yesNo : 1,
  range: 2,
  textArea: 3,
  radioGroup: 4,
  multiCheckBox: 5,
});

let dummyQuestions = [
  {
    question: "What is your home language ?",
    type: 0,
    questionId: "77tvjvjvjvjvjeds",
  },
  {
    question: "Are you still going to Limpopo?",
    type: 3,
    questionId: "77tvjv43djvjeds",
  },
  {
    question: "What's you mode of transport?",
    type: 5,
    questionId: "85411s686hhh",
    options: [
      {
        text: "I have a bike",
        value: 1,
      },
      {
        text: "I have a car",
        value: 2,
      },
      {
        text: "I have a Boat",
        value: 3,
      },
    ],
  },
  {
    question: "Rate your experience from 1 to 10",
    type: 2,
    questionId: "77tv1qaqvjvjvjeds",
  },
  {
    question: " Do you agree with Russians?",
    type: 4,
    questionId: "854758686hhh",
    options: [
      {
        text: "Agrees",
        value: 1,
      },
      {
        text: "Strongly Agree",
        value: 2,
      },
      {
        text: "Disagree",
        value: 3,
      },
    ],
  },
  {
    question: "Write your short bio",
    type: 1,
    questionId: "7987v1qaqvjvjeds",
  },
];

function questionsGenerator(question, type, questionId, questionNumber) {
  switch (type) {
    case questionTypes.input:
      return (
        "<div class='question-answer'>" +
        "<div class='question'>" +
        "<div class='dot'>" +
        `<span class='numbering'>${questionNumber}</span>` +
        "</div>" +
        `<h2>${question}</h2>` +
        " </div>" +
        "<div class='answer'>" +
        "<span class='arrow-answer'>&#10551;</span>" +
        `<input id=${questionId} placeholder=' e.g javascript' class='standard-input' />` +
        "</div>" +
        "</div>"
      );
    case questionTypes.yesNo:
      return (
        "<div class='question-answer'>" +
        "<div class='question'>" +
        "<div class='dot'>" +
        `<span class='numbering'>${questionNumber}</span>` +
        "</div>" +
        `<h2>${question}</h2>` +
        " </div>" +
        "<div class='answer-yes-no'>" +
        "<span class='arrow-answer'>&#10551;</span>" +
        "<div class='yes-no'>" +
        `<input type="radio" id=${questionId} name=${questionId} value="Yes" />` +
        "<label for='yes'>Yes</label>" +
        "<br />" +
        `<input type="radio" id=${questionId}  name=${questionId} value="No" />` +
        "<label for='no'>No</label>" +
        "<br/>" +
        "</div>" +
        "</div>" +
        "</div>"
      );
    case questionTypes.range:
      return (
        "<div class='question-answer'>" +
        "<div class='question'>" +
        "<div class='dot'>" +
        `<span class='numbering'>${questionNumber}</span>` +
        "</div>" +
        `<h2>${question}</h2>` +
        " </div>" +
        "<div class='answer'>" +
        "<span class='arrow-answer'>&#10551;</span>" +
        `<input id=${questionId} class="standard-input" type="range" min="0" max="10" />` +
        "</div>" +
        "</div>"
      );
    // case questionTypes.textArea:
    //   return (
    //     "<div class='question-answer'>" +
    //     "<div class='question'>" +
    //     "<div class='dot'>" +
    //     `<span class='numbering'>${questionNumber}</span>` +
    //     "</div>" +
    //     `<h2>${question}</h2>` +
    //     " </div>" +
    //     "<div class='answer-textAreaField'>" +
    //     "<span class='arrow-answer'>&#10551;</span>" +
    //     `<textarea id=${questionId} class="textAreaField" rows="4" cols="45">` +
    //     "" +
    //     "</textarea>" +
    //     "</div>" +
    //     "</div>"
    //   );
    // case questionTypes.radioGroup:
    //   return (
    //     "<div class='question-answer'>" +
    //     "<div class='question'>" +
    //     "<div class='dot'>" +
    //     `<span class='numbering'>${questionNumber}</span>` +
    //     "</div>" +
    //     `<h2>${question}</h2>` +
    //     " </div>" +
    //     "<div class='answer-checkRadio'>" +
    //     "<span class='arrow-answer'>&#10551;</span>" +
    //     " <div class='radioQuestions'>" +
    //     radioOptionCreator(questionId, options) +
    //     "</div>" +
    //     "</div>" +
    //     "</div>"
    //   );

    // case questionTypes.multiCheckBox:
    //   return (
    //     "<div class='question-answer'>" +
    //     "<div class='question'>" +
    //     "<div class='dot'>" +
    //     `<span class='numbering'>${questionNumber}</span>` +
    //     "</div>" +
    //     `<h2>${question}</h2>` +
    //     " </div>" +
    //     "<div class='answer-checkRadio'>" +
    //     "<span class='arrow-answer'>&#10551;</span>" +
    //     " <div class='radioQuestions'>" +
    //     checkOptionCreator(questionId, options) +
    //     "</div>" +
    //     "</div>" +
    //     "</div>"
    //   );
    default:
      return '';
  }
}

let questionViews = "";

dummyQuestions.forEach(({ question, questionId, type }, index) => {
  questionViews += questionsGenerator(question, type, questionId, index + 1);
});
questionContainer.innerHTML = questionViews;

// function radioOptionCreator(questionId, options) {
//   let initiaOptions = "";
//   options.forEach(({ text, value }) => {
//     initiaOptions +=
//       `<input type="radio" id=${questionId} name=${questionId} value=${value} />` + `<label>${text}</label><br />`;
//   }) + "</div>";
//   return initiaOptions;
// }

// function checkOptionCreator(questionId, options) {
//   let initiaOptions = "";
//   options.forEach(({ text, value }) => {
//     initiaOptions +=
//       `<input type="checkbox" id=${questionId} name=${questionId} value=${value} />` + `<label>${text}</label><br />`;
//   }) + "</div>";
//   return initiaOptions;
// }
