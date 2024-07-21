let inputTask = document.querySelector(".addTask .inputTask");
let addBtn= document.querySelector(".addTask #addButton");
let pendingTasks = document.querySelector(".pendingTasks");
const clearBtn= document.querySelector(".clearAll .clear");
let taskCount=0;

addBtn.addEventListener("click",()=>{
    addTask();
});

inputTask.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        addTask();
    }
});

window.addEventListener('load', () => {
    loadTasks();
});

const addTask=()=>{
    let inputText=inputTask.value;
    if(inputText.trim() !== ''){
    const newTask = document.createElement('div');
    newTask.className = "task";
    taskCount++;
    newTask.innerHTML = `<p>${inputText}</p><button class="deleteTask"><i class="fa-solid fa-trash"></i></button>`;
    pendingTasks.appendChild(newTask);
    message(taskCount);
    updateClearBtnColor();
    const deleteButton = newTask.querySelector(".deleteTask");
    deleteButton.addEventListener("click", deleteTask); 
    saveTasks();
    }
    inputTask.value = "";
};

const deleteTask = (event) => {
    const task = event.target.closest('.task');
    task.remove();
    taskCount--;
    message(taskCount);
    updateClearBtnColor();
    saveTasks();
};


clearBtn.addEventListener("click",()=>{
    pendingTasks.innerHTML="";
    taskCount=0;
    message(taskCount);
    updateClearBtnColor();
    saveTasks();
});

  
 
 let message = (taskCount)=>{
    let msg = document.querySelector(".pendingTaskNo p");
    msg.innerText = `You Have ${taskCount} Pending Tasks`;
 }

 function saveTasks() {
    const tasks = Array.from(pendingTasks.children).map(task => task.querySelector('p').innerText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskCount = tasks.length;
    tasks.forEach(taskText => {
        const newTask = document.createElement('div');
        newTask.className = "task";
        newTask.innerHTML = `<p>${taskText}</p><button class="deleteTask"><i class="fa-solid fa-trash"></i></button>`;
        pendingTasks.appendChild(newTask);

        const deleteButton = newTask.querySelector(".deleteTask");
        deleteButton.addEventListener("click", deleteTask);
    });
    message(taskCount);
    updateClearBtnColor();
}

 const updateClearBtnColor = () => {
    if (taskCount === 0) {
        clearBtn.style.backgroundColor = "rgba(106, 81, 248,0.5)";
    } else {
        clearBtn.style.backgroundColor ="rgba(106, 81, 248)";
    }
};