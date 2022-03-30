url = "http://localhost:3000/questions";
answerUrl = "http://localhost:3000/answers";
responseUrl = "http://localhost:3000/respondent";

const fetchQuestion = async ()=> {
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

const fetchAnswers = async ()=> {
    try {
        const response = await fetch(answerUrl, {
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

const fetchResponse = async ()=> {
    try {
        const response = await fetch(responseUrl, {
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

let questionDiv = document.querySelector('#Questions')
let Name = document.querySelector('#surv')
let Description = document.querySelector('#descr')
let Creator = document.querySelector('#crtName')
const startingData = ()=>{
    fetchQuestion().then(res=>{
        Name.innerText= sessionStorage.getItem('surveyName')
        Description.innerText= sessionStorage.getItem('description')
        Creator.innerText= sessionStorage.getItem('logged')
        res.forEach(element => {
            if(element.surveyId==sessionStorage.getItem('surveyId')){
                question = document.createElement('li')
                question.classList.add('item')
                question.innerText= element.Question
                questionDiv.appendChild(question)
    
            }
            
        });
    })

}
startingData()

respond= document.querySelector('#responses')
const tableData = async ()=>{
    let questions = await fetchQuestion()
    let responses = await fetchAnswers()
    fetchResponse().then(res=>{
        sessionStorage.removeItem('responseId')
        res.forEach( resp =>{
            // console.log(resp.surveyId)
            // console.log(sessionStorage.getItem('surveyId'))
            if (resp.surveyId===sessionStorage.getItem('surveyId')){
                sessionStorage.setItem('responseId',resp.Id)
            }
            responses.forEach(item=>{
                if(item.ResponseId===sessionStorage.getItem('responseId')){
                    console.log(item.answer)
                div = document.createElement('div')
                line = document.createElement('hr')
                div.classList.add('repAns')
                let Id = document.createElement('p')
                let quest = document.createElement('p')
                let ans = document.createElement('p')
                ans.classList.add('answer')
                Id.innerText=item.ResponseId;
                ans.innerText=item.answer;
            

                questions.forEach(it=>{
                    if (it.Id===item.questionId){
                        quest.innerText=it.Question;
                    
                        
                    }
                    
                })
                div.appendChild(Id)
                div.appendChild(quest)
                div.appendChild(ans)
                respond.appendChild(div)
                respond.appendChild(line)


                }
            })
            // sessionStorage.removeItem('respId')
        })
    })
}


tableData()
