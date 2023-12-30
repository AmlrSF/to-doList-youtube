


class Task {
    constructor(description){
        this.description = description;
        

    }
}

class Todo {
    constructor (){
        this.Tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        this.renderTasks();
    }




    saveTask(){
        localStorage.setItem("tasks",JSON.stringify(this.Tasks));
    }


 

    // addTask
    addTask (description){
        const newTask = new Task(description);

        this.Tasks.push(newTask);
        this.saveTask();
        this.renderTasks();

    }
    // updateTask
    updateTask(description, index){
        this.Tasks[index].description = description;
        this.saveTask();
        this.renderTasks();
       
    }
    // delete task

    deleteTask(index){
        this.Tasks.splice(index ,1);
        this.saveTask();
        this.renderTasks();
    }
    // renderTasks


    renderTasks(){
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";


        this.Tasks.forEach((task, index)=>{
            const listItem = document.createElement("li");
            listItem.textContent = task.description;


            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete"
            deleteBtn.classList.add("delete");
            deleteBtn.onclick = ()=>{
                const confirmdeletion = confirm("are sure do you want to delete this task");

                if(confirmdeletion){
                    //delete function
                    this.deleteTask(index)
                }
            }

            const updateBtn = document.createElement("button");
            updateBtn.textContent = "Update"
            updateBtn.classList.add("update");
            updateBtn.onclick = ()=>{
                const newDescription = prompt("enter a new description", task.description);

                if(newDescription !== null){
                    
                    this.updateTask(newDescription, index);
                }

            }
            

            listItem.appendChild(updateBtn)
            listItem.appendChild(deleteBtn);
            taskList.appendChild(listItem);
        })
    }

}



const btn = document.getElementById("addTask");
const todo = new Todo();

const AddTask = ()=>{
    const taskInput = document.getElementById("taskInput");
    const description = taskInput.value.trim();


    if(description !== ""){
        // console.log(description);

        todo.addTask(description);

        taskInput.value="";


    }
}

btn.addEventListener("click",AddTask);

