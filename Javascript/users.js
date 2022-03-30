let url = "http://localhost:3000/survey";
nam = document.querySelector('#name')
nam.innerText=sessionStorage.getItem('logged')
const fetchSurvey = async ()=> {
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
screen = document.querySelector('#screen');
screen2 = document.querySelector('#screen2')
survB = document.querySelector('#survey1');
complete = document.querySelector('#Completed1')

survB.addEventListener('click',()=>{
    screen.style.visibility = 'visible';
    screen2.style.visibility = 'hidden';

})
complete.addEventListener('click',()=>{
    screen2.style.visibility = 'visible';
    screen.style.visibility = 'hidden';

})

let url2 = "http://localhost:3000/questions";

const fetchQuestion = async ()=> {
  try {
      const response = await fetch(url2, {
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

const questions =  fetchQuestion()



// const surveydata = ()=>{
    fetchSurvey().then(res=>{
        res.forEach(item=>{
            // console.log(item)

            let div = document.createElement('div');
            div.classList.add('list')

            let quest = document.createElement('h3');
            quest.innerText =item.Name;
            div.appendChild(quest);

            let info = document.createElement('Button');
            info.innerHTML = 'Start Survey';
            info.classList.add('info');
            div.appendChild(info);
            info.setAttribute('id',item.Id)
            console.log(item.Id)
            line = document.createElement('hr')
            

            
            if (screen){
                screen.appendChild(div);
                screen.appendChild(line)
            }
            info.addEventListener('click', ()=>{
                localStorage.setItem('surveyId', info.getAttribute('id'))
                
                window.location.href='../src/index.html'
            })
            
        })
    })
// }
// surveydata()

