//selecting elements

const userInput = document.querySelector(".user-input")
const submitBtn = document.querySelector(".submit")
const list = document.querySelector(".list")
const clearBtn = document.querySelector("footer")

//default values

let tasks = []
let editing = false
let editElement
let editId = ""


//show tasks when window loads

window.addEventListener("DOMContentLoaded", renderList)


//task add and edit btn

submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if (userInput.value && !editing) {
        let value = userInput.value
        let id = new Date().getTime().toString()
        tasks.push({ id, value })
        addToLocalStorage("tasks", tasks)
        renderList()
        setBackToDefault()
    } else if (userInput.value && editing) {
        editElement.innerHTML = userInput.value
        editLocalStorage()
        setBackToDefault()
    }
})


//renderlist function

function renderList() {
    let storedTasks = getStorage()
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


    //selecting dlt btn

    const delBtns = list.querySelectorAll(".delete-btn")
    delBtns.forEach((btn) => {
        btn.addEventListener("click", deleteItem)
    });


    //selecting edit btn

    const editBtns = list.querySelectorAll(".edit-btn")
    editBtns.forEach((btn) => {
        btn.addEventListener("click", editItem)
    })
}




function setBackToDefault() {
    editing = false
    editId = ""
    userInput.value = ""
    submitBtn.innerHTML = `<i class="fa-solid fa-plus"></i>`
}

function deleteItem(e) {
    let item = e.currentTarget.parentElement.parentElement
    let currentId = item.dataset.id
    item.remove()
    let storedTasks = getStorage()
    tasks = storedTasks.filter((task) => {
        if (task.id !== currentId) {
            return task
        }
    })
    addToLocalStorage("tasks", tasks)
}


function editItem(e) {
    editElement = e.currentTarget.parentElement.previousElementSibling
    userInput.value = editElement.innerHTML
    submitBtn.innerHTML = `<i class="fa fa-pen-to-square"></i>`
    editId = editElement.parentElement.dataset.id
    editing = true

}



//localstorage functions

function getStorage(){
    return JSON.parse(localStorage.getItem("tasks"))
}

function addToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function editLocalStorage() {
    let storedTasks = getStorage()
    tasks = storedTasks.map((task) => {
        if (task.id === editId) {
            task.value = userInput.value
        }
        return task
    })
    addToLocalStorage("tasks", tasks)
}


//all clear

clearBtn.addEventListener("click", () => {
    localStorage.clear()
    tasks = []
    renderList()
    setBackToDefault()

})
