let questionsAnswers = [];
let submitButton = document.querySelector(".submitting-answers");
let url = "http://localhost:3000/respondent";
let urlAnswers = "http://localhost:3000/answers";

const fetchResponse = async ()=> {
  try {
      const response = await fetch(url, {
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

submitButton.addEventListener("click", receivedAnswers);//-------Button-------
async function receivedAnswers() {
  // sessionStorage.removeItem('respId')
  dummyQuestions.forEach(({ questionId, type }) => {
    if (type == questionTypes.yesNo || type == questionTypes.radioGroup) {
      let answers = document.querySelectorAll(`[id='${questionId}']`);

      questionsAnswers.push({
        questionId: questionId,
        answer: [...answers].find((elmnt) => elmnt.checked == true).value,
      });
      return;
    } else if (type == questionTypes.multiCheckBox) {
      let answers = [...document.querySelectorAll(`[id='${questionId}']`)];

      answers = answers.filter((elmnt) => elmnt.checked).map((elnt) => elnt.value);

      questionsAnswers.push({
        questionId: questionId,
        answer: answers,
      });
      return;
    }

    questionsAnswers.push({
      questionId: questionId,
      answer: document.querySelector(`[id='${questionId}']`).value,
    });
  });
  console.log("checking....", questionsAnswers);
  let response ={
    surveyId: localStorage.getItem('surveyId'),
    userId: sessionStorage.getItem('userId'),
  }
  addResponse(response)

  let responses = await fetchResponse()
    responses.forEach(item=>{
      
      if (item.surveyId==localStorage.getItem('surveyId')){
        localStorage.setItem('respId',item.Id)
     
      } 
    
    })
    questionsAnswers.forEach(item=>{
      let answer= {
        ResponseId: localStorage.getItem('respId'),
        questionId: item.questionId,
        answer: item.answer
      }
      console.log(answer)
      addAnswer(answer)
    })  
  alert('Thank you for taking the survey, You will be now redirected to Survey List')
  window.location.href="../HTML/users.html"
}






//------------------------------------------------------------DB-Operations---------------------//

const addResponse = async (item)=> { //add user function
  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
          },
          body: JSON.stringify(item)
      })
      return response.json();
  }catch(e){
      console.log(e)
  }
}


const addAnswer = async (item)=> { //add user function
  try {
      const response = await fetch(urlAnswers, {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
          },
          body: JSON.stringify(item)
      })
      return response.json();
  }catch(e){
      console.log(e)
  }
}