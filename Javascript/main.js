let url = "http://localhost:3000/users";
let url2 = "http://localhost:3000/accounts";
let url3 = "http://localhost:3000/survey";
let url4 = "http://localhost:3000/questions";

sign_up = document.querySelector('#sign');// sdont't have account
login = document.querySelector('#log');// already have account
logContainer = document.querySelector(".Container")//login screen
signContainer = document.querySelector('.Container2')//sign up
signB = document.querySelector('#signB')
logB = document.querySelector('#logB');
lpassword = document.querySelector('#lpassword');
lusername = document.querySelector('#lusername');

//---------------------------------------------------DB Operations-----------------------------------DB Operations----------------------------
const fetchUsers = async ()=> {
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

const addSurvey = async (item)=> { //add user function
    try {
        const response = await fetch(url3, {
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
const addQuestion = async (item)=> { //add user function
    try {
        const response = await fetch(url4, {
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
const fetchQuestion = async ()=> {
    try {
        const response = await fetch(url4, {
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
const fetchSurvey = async ()=> {
    try {
        const response = await fetch(url3, {
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



//Login and Register......................Login and Register...............................Login and Register....................Login and Register

if(logB){
    logB.addEventListener('click', async (e)=> {//Log in button
        e.preventDefault();
        lpassword = document.querySelector('#lpassword');
        lusername = document.querySelector('#lusername');
        let user = {
            username: lusername.value,
            Password: lpassword.value,
        }
        lpassword.value="";
        lusername.value="";
        let allUsers = []
        allUsers = await fetchUsers()
        // console.log(allUsers);
        if (allUsers.find(un => un.username===user.username)){
            let result = await loginUser(user)
            if(result==false){
                 
                alert('Incorrect Password')
            }
            else{
                sessionStorage.setItem('logged',result.Name)
                sessionStorage.setItem('userId', result.Id)
                if(result.IsAdmin==1){
                    window.location.href = "../HTML/listA.html";
                    
                }
                else{
                    window.location.href='../HTML/users.html'
                }
            }
        }
        else if(!allUsers.find(un => un.username===user.username)){
            alert('incorrect username')
        }   
    })
}



if(sign_up){
    sign_up.addEventListener('click',()=>{//go to sign up
        logContainer.style.display ='none';
        signContainer.style.display ='inherit';
        
    })   
}

if (login){
    login.addEventListener('click',()=>{//go to login
        signContainer.style.display ='none';
        logContainer.style.display ='inherit';
    
    });
}


if (signB){
    signB.addEventListener('click',async ()=>{//sign up button  functionality
        cUsername = document.getElementById('cUsername').value;
        cPassword = document.querySelector('#cPassword');
        fname = document.querySelector('#fullName');
    
        let user ={
            username: cUsername,
            Name: fname.value,
            IsAdmin: 0,
            Password: cPassword.value
    
        }
        addUsers(user); 
        location.reload()
        alert("Registerd")
    })
}
//---------------------------------------populate--------------------------------------------surveyList

survB= document.querySelector('#survey')
if(survB){
    survB.addEventListener('click',()=>{
        // alert('ok')
        crtCon.style.display='none';
        repCont.style.display='none';
        cont.style.display= 'inherit';
        location.reload()
       

    })
}

crtCon =document.querySelector('#creatCon')
cSurvey = document.querySelector('#cSurvey');
if (cSurvey){
    cSurvey.addEventListener('click',()=>{
        cont.style.display= 'none';
        repCont.style.display='none';
        crtCon.style.display='inherit';

    })
}
report = document.querySelector('#rep');
repCont = document.querySelector('#report');
if(repCont){
    report.addEventListener('click',()=>{
        cont.style.display= 'none';
        crtCon.style.display='none';
        repCont.style.display='inherit';
    })

}
const reportdata = ()=>{
    fetchSurvey().then(res=>{
        res.forEach(item=>{
            let div = document.createElement('div');
            div.classList.add('labels')

            let quest = document.createElement('h3');
            quest.classList.add('para')
            quest.innerText =item.Name;
            div.appendChild(quest);

            let view = document.createElement('Button');
            view.innerHTML = 'View';
            view.classList.add('info');
            view.setAttribute('id',item.Id)
            div.appendChild(view);

            if (repCont){
                repCont.appendChild(div);
                
            }
            view.addEventListener('click',()=>{
                sessionStorage.setItem('surveyId',view.getAttribute('id'))
                sessionStorage.setItem('surveyName',item.Name)
                sessionStorage.setItem('description',item.Description)
                window.location.href="../HTML/Report.html"
            })
            
            
        })
    })
}
reportdata()
//Creating Survey Section......................................................Create Survey.................................Create Survey/
cont = document.querySelector('#listT')
const surveydata = ()=>{
    fetchSurvey().then(res=>{
        res.forEach(item=>{
            console.log(item)
            let div = document.createElement('div');
            div.classList.add('list')

            let quest = document.createElement('h3');
            quest.innerText =item.Name;
            div.appendChild(quest);

            let info = document.createElement('Button');
            info.innerHTML = 'Edit';
            info.classList.add('info');
            info.setAttribute('id',item.Id)
            div.appendChild(info);

            let del = document.createElement('Button');
            del.innerHTML = 'del';
            del.classList.add('del');
            div.appendChild(del);
            line = document.createElement('hr')
            if (cont){
                cont.appendChild(div);
                cont.appendChild(line);
            }
            info.addEventListener('click',()=>{
                sessionStorage.setItem('surveyId',info.getAttribute('id'))
                sessionStorage.setItem('surveyName',item.Name)
                window.location.href="../HTML/crtQues.html"
            })
            
            
        })
    })
}
surveydata()

Create = document.querySelector('#create');

if(Create){
    Create.addEventListener('click', async ()=>{
        //e.preventDefault()
        sessionStorage.setItem('surveyName','')
        sessionStorage.setItem('surveyId','')
        Name1 = document.querySelector('#survName')
        adminName = document.querySelector('#Creator')
        comment = document.querySelector('#description')
        let survey ={
            CreatedBy: sessionStorage.getItem('userId'),
            Name: Name1.value,
            Description: comment.value,
        }
        
        await addSurvey(survey)
        let allSurveys = await fetchSurvey()
        allSurveys.forEach(element => {
            if (element.Name==Name1.value){
                sessionStorage.setItem('surveyName',element.Name)
                sessionStorage.setItem('surveyId', element.Id)}
            
        });
        
        // questionData()
        window.location.href='../HTML/crtQues.html'  
    })   
}


let addQ =document.getElementById('addQ');
surName = document.querySelector('#surv')
Creator = document.querySelector('#crtName')
qArea = document.querySelector('#Questions')
if(addQ){
addQ.addEventListener('click',async ()=>{
        question =document.querySelector('#question')
        qType =document.querySelector('#qType')
        let newQ = {
            surveyId: sessionStorage.getItem('surveyId'),
            Question: question.value,
            questionType: qType.value,
        }
        console.log(newQ)
    addQuestion(newQ);
    location.reload()
    
    
        
    })
    }
done = document.querySelector('#done')
information =document.querySelector('.survDetails1')
adding = document.querySelector('#d')
if (done){
    done.addEventListener('click',()=>{
        window.location.href= "../HTML/listA.html";
        // location.reload()
    })
}
const questionData = ()=> {
fetchQuestion().then(res=>{
    res.forEach(element => {
        if (element.surveyId==sessionStorage.getItem('surveyId')){
       let para = document.createElement('ol');
       para.classList.add('para')
       para.innerText = element.Question
       if(qArea){
        qArea.appendChild(para)
        Creator.innerText = sessionStorage.getItem('logged');
        surName.innerText = sessionStorage.getItem('surveyName');
       }
       
       
       
   }
})
   });

}
questionData()

//--------------------DB Operations-------------------------DB Operations----------------------------------------------DB Operations

async function updateData(data) {
    
    try {
      const response = await fetch(`${url}/${data.Id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      return response;
    } catch (err) {
      console.log("found error", err);
    }
  }




const addUsers = async (item)=> { //add user function
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




const loginUser = async (item)=> { //add user function
    try {
        const response = await fetch(url2, {
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


const validateUser = async (item)=> { //add user function
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