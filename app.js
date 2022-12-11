//selecting elements

const userInput = document.querySelector(".user-input")
const submitBtn = document.querySelector(".submit")
const list = document.querySelector(".list")
const clearBtn = document.querySelector("footer")
const alert = document.querySelector(".alert")



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
        displayAlert("task added", "success")
        setBackToDefault()
    } else if (userInput.value && editing) {
        editElement.innerHTML = userInput.value
        editLocalStorage()
        displayAlert("task edited", "success")
        setBackToDefault()
    } else {
        displayAlert("please enter task", "danger")
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
                   <p className="title">${item.value}<p>
                   <div class="btn-container">
                    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                    <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                   </div> 
                </li> 
               
               `
    }).join("")

    if (!list.innerHTML) {
        clearBtn.classList.add("display")
    } else {
        clearBtn.classList.remove("display")
    }

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
    renderList()
    displayAlert("task deleted", "danger")
}


function editItem(e) {
    editElement = e.currentTarget.parentElement.previousElementSibling
    userInput.value = editElement.innerHTML
    submitBtn.innerHTML = `<i class="fa fa-pen-to-square"></i>`
    editId = editElement.parentElement.dataset.id
    editing = true

}

//alert

function displayAlert(value, color) {

    alert.textContent = value + ` !`
    alert.classList.add(`alert-${color}`)

    setTimeout(() => {
        alert.textContent = ""
        alert.classList.remove(`alert-${color}`)
    }, 1000);


}

//localstorage functions

function getStorage() {
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
    displayAlert("cleared tasks", "danger")
    setBackToDefault()

})
