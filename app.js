const userInput = document.querySelector(".user-input")
const submitBtn = document.querySelector(".submit")
const list = document.querySelector(".list")
const clearBtn = document.querySelector("footer")
let tasks = []
let editing = false
let editElement
let editId = ""


window.addEventListener("DOMContentLoaded", showStoredTasks)

submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    
    if (userInput.value && !editing) {
        let value = userInput.value
        let id = new Date().getTime().toString()
        tasks.push({ id, value })
        userInput.value = ""
        renderList()
        addToLocalStorage()
        setBackToDefault()
    } else if (userInput.value && editing) {
        editElement.innerHTML = userInput.value
        editLocalStorage()
        setBackToDefault()
    }


})


function renderList() {


    list.innerHTML = tasks.map((item) => {
        return `
                <li class="list-item" data-id="${item.id}">
                <h3 className="title">${item.value}</h3>
                   <div class="btn-container">
                    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                    <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
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
    tasks = storedTasks
    localStorage.setItem("tasks", JSON.stringify(storedTasks))
}


function editItem(e) {
    editElement = e.currentTarget.parentElement.previousElementSibling
    userInput.value = editElement.innerHTML
    submitBtn.innerHTML = `<i class="fa fa-pen-to-square"></i>`
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
    submitBtn.innerHTML  = `<i class="fa-solid fa-plus"></i>`
}


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
                    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                    <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
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

clearBtn.addEventListener("click", () => {
  localStorage.clear()
  tasks = []
  renderList()
  setBackToDefault()

})