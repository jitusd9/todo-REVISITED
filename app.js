const input = document.querySelector('#input');
const submit = document.querySelector('#submit');
const task = document.querySelector('#taskList')

var count = 1;

// This statement checks if there is localStorage or not if its there please print it first 
if(Object.keys(localStorage) != ""){
    console.log('localStorage present here');

    for (let key in localStorage){
        if(!localStorage.hasOwnProperty(key)){
            // will skip keys like "getItem" "setItem"
            continue;
        }
        // console.log(`${key} : ${localStorage.getItem(key)}`);

        // parse localStorage string to array 
        let dataStored = localStorage.getItem(key);
        let myData = JSON.parse(dataStored);

        // var randomKey = count + Math.floor(Math.random() * 1000) + count;

        let taskTime = document.createElement('p');
        taskTime.setAttribute('class', 'time');
        taskTime.innerText = myData[0];

        let taskText = document.createElement('p');
        taskText.setAttribute('class', 'task');
        taskText.innerText = myData[1]

        let tasktab = document.createElement('div');
        tasktab.setAttribute('class', 'task-tab');
        tasktab.setAttribute('id', key);

        let controls = document.createElement('div');
        controls.setAttribute('class', 'controls');

        const spanButtons = ['🔳 mark', '♻', '❌'];

        for(i = 0; i< 3; i++){
            let span = document.createElement('span');
            span.innerText = spanButtons[i];
            if(i === 0){
                span.setAttribute('class', 'mark');
                span.setAttribute('title', 'Mark It');
            }else if(i === 1){
                span.setAttribute('class', 'edit');
                span.setAttribute('title', 'Edit');
            }else if(i === 2){
                span.setAttribute('class', 'delete');
                span.setAttribute('title', 'Delete It');
            }

            controls.appendChild(span);

        }

                // temporary solution for providing random id to tasktabs
                // count++;
        
                let hrline = document.createElement('hr');
        
                tasktab.appendChild(taskTime);
                tasktab.appendChild(taskText);
                tasktab.appendChild(hrline);
                tasktab.appendChild(controls);
                task.prepend(tasktab);

        // CARD control buttons mark complete and uncomplete function 
        const markBtn = document.querySelector('.mark');
        markBtn.addEventListener('click', toogleIcon);
        // edit funcion 
        const editBtn = document.querySelector('.edit');
        editBtn.addEventListener('click', editTask);
        // delete function
        const deleteBtn = document.querySelector('.delete');
        deleteBtn.addEventListener('click', deleteTask);    

    } // end of for loop through localstorage
    
}else{
    console.log('localStorage not available');
}

submit.addEventListener('click', displayIt);

function displayIt(){
    if(input.value != "" || localStorage){

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+today.toLocaleTimeString();

        var randomKey = count + Math.floor(Math.random() * 1000) + count;

        //  LOCAL STORAGE add key value pair like dictionary in array

        let storeTimeValue = [dateTime, input.value];
        
        localStorage.setItem(randomKey, JSON.stringify(storeTimeValue));

        

        let taskTime = document.createElement('p');
        taskTime.setAttribute('class', 'time');
        taskTime.innerText = dateTime;

        let taskText = document.createElement('p');
        taskText.setAttribute('class', 'task');
        taskText.innerText = input.value;

        let tasktab = document.createElement('div');
        tasktab.setAttribute('class', 'task-tab');
        tasktab.setAttribute('id', randomKey);

        let controls = document.createElement('div');
        controls.setAttribute('class', 'controls');

        const spanButtons = ['🔳 mark', '♻', '❌'];

        for(i = 0; i< 3; i++){
            let span = document.createElement('span');
            span.innerText = spanButtons[i];
            if(i === 0){
                span.setAttribute('class', 'mark');
                span.setAttribute('title', 'Mark It');
            }else if(i === 1){
                span.setAttribute('class', 'edit');
                span.setAttribute('title', 'Edit');
            }else if(i === 2){
                span.setAttribute('class', 'delete');
                span.setAttribute('title', 'Delete It');
            }

            controls.appendChild(span);

        }

        // temporary solution for providing random id to tasktabs
        count++;
        
        let hrline = document.createElement('hr');

        tasktab.appendChild(taskTime);
        tasktab.appendChild(taskText);
        tasktab.appendChild(hrline);
        tasktab.appendChild(controls);
        task.prepend(tasktab);

        input.value = "";

        // console.log('LocalStorage Length :' , localStorage.length);

        // CARD control buttons mark complete and uncomplete function 
        const markBtn = document.querySelector('.mark');
        markBtn.addEventListener('click', toogleIcon);
        // edit funcion 
        const editBtn = document.querySelector('.edit');
        editBtn.addEventListener('click', editTask);
        // delete function
        const deleteBtn = document.querySelector('.delete');
        deleteBtn.addEventListener('click', deleteTask);


    }else{
        alert('please write something first!');
    }
    
}


    // toggle Icon Function 
    function toogleIcon(e){
        if(e.target.innerText === '🔳 mark'){
            e.target.innerText = '✅ completed';
            e.target.setAttribute('class', 'mark highlight');
            e.target.parentElement.parentElement.querySelector('.task').style.textDecoration = 'line-through';
            e.target.parentElement.parentElement.querySelector('.task').style.color = '#094e3760';
        }else{
            e.target.innerText = '🔳 mark';
            e.target.setAttribute('class', 'mark');
            e.target.parentElement.parentElement.querySelector('.task').style.textDecoration = 'none';
            e.target.parentElement.parentElement.querySelector('.task').style.color = '#094e37';
        }
    }
        
    // Edit Function 
    function editTask(e){
        alert("feature under maintenace! 😔");
    }

    // delete function 
    function deleteTask(e){
        // if(confirm("Are you sure want to delete it?")){
            const undoCard = document.querySelector('.undo');
            let deleteId = e.target.parentNode.parentNode;
            console.log(deleteId.id);
            // // remove from webpage 
            // deleteId.remove(deleteId);
            // // remove from localStorage 
            // localStorage.removeItem(deleteId.id);
            undoCard.style.transition = '0.3s';
            undoCard.style.opacity = '1';
            undoCard.style.top = '85%';
            
            const timer = document.querySelector('.timer');
            var countdown = 3;
            var timerClock = setInterval(() => {
                countdown--;               
                timer.querySelector('p').innerHTML = countdown; 
            }, 1500);

            var undoTimer = setTimeout(() => {
                undoCard.style.transition = '0.3s';
                undoCard.style.opacity = '0';
                undoCard.style.top = '105%';
                // remove from webpage 
                deleteId.remove(deleteId);
                // remove from localStorage 
                localStorage.removeItem(deleteId.id);
                clearInterval(timerClock);
            }, 4500);

            // clearTimeout with undo button click 
            undoCard.querySelector('.revert').addEventListener('click', (e) => {
                undoCard.style.transition = '0.3s';
                undoCard.style.opacity = '0';
                undoCard.style.top = '105%';
                clearTimeout(undoTimer);
                clearInterval(timerClock);
            }) 
            
        // }else{
        //     // do nothing 
        //     console.log('objection overruled');
        // }
    }