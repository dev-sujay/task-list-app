const userInput = document.querySelector(".user-input")
const submitBtn = document.querySelector(".submit")
const list = document.querySelector(".list")
let tasks = []
let editing = false
let editElement
let editId = ""


window.addEventListener("DOMContentLoaded", showStoredTasks)

submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let id = new Date().getTime().toString()
    let value = userInput.value
    if (value && !editing) {
        tasks.push({ id, value })
        userInput.value = ""
        renderList()
        addToLocalStorage()
        setBackToDefault()
    } else if (value && editing) {
        editElement.innerHTML = userInput.value
        editLocalStorage()
        setBackToDefault()
    }


})



function showStoredTasks() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks"))
    if (storedTasks) {
        tasks = storedTasks
    }

    list.innerHTML = tasks.map((item) => {
        return `
                <li class="list-item" data-id="${item.id}">
                <h3 className="title">${item.value}</h3>
                   <div class="btn-container">
                    <button class="delete-btn">delete</button>
                    <button class="edit-btn">edit</button>
                   </div> 
                </li> 
               
               `
    }).join("")

    const delBtns = list.querySelectorAll(".delete-btn")
    delBtns.forEach((btn) => {
        btn.addEventListener("click", deleteItem)
    });

    const editBtns = list.querySelectorAll(".edit-btn")
    editBtns.forEach((btn) => {
        btn.addEventListener("click", editItem)
    })

}

function renderList() {


    list.innerHTML = tasks.map((item) => {
        return `
                <li class="list-item" data-id="${item.id}">
                <h3 className="title">${item.value}</h3>
                   <div class="btn-container">
                    <button class="delete-btn">delete</button>
                    <button class="edit-btn">edit</button>
                   </div> 
                </li> 
               
               `
    }).join("")

    const delBtns = list.querySelectorAll(".delete-btn")
    delBtns.forEach((btn) => {
        btn.addEventListener("click", deleteItem)
    });

    const editBtns = list.querySelectorAll(".edit-btn")
    editBtns.forEach((btn) => {
        btn.addEventListener("click", editItem)
    })

}

function addToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}


function deleteItem(e) {
    let item = e.currentTarget.parentElement.parentElement
    let currentId = item.dataset.id
    item.remove()
    let storedTasks = JSON.parse(localStorage.getItem("tasks"))
    storedTasks = storedTasks.filter((task) => {
        if (task.id !== currentId) {
            return task
        }
    })
    localStorage.setItem("tasks", JSON.stringify(storedTasks))
}


function editItem(e) {
    editElement = e.currentTarget.parentElement.previousElementSibling
    userInput.value = editElement.innerHTML
    submitBtn.textContent = "edit"
    editId = editElement.parentElement.dataset.id
    editing = true

}

function editLocalStorage() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks"))
    storedTasks = storedTasks.map((task) => {
        if (task.id === editId) {
            task.value = userInput.value    
        } 
        return task  
    })

    localStorage.setItem("tasks", JSON.stringify(storedTasks))
}


function setBackToDefault(){
    editing = false
    editId = ""
    userInput.value = ""
    submitBtn.textContent  = "submit"
}