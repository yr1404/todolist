const taskTable = document.querySelector('[table-data]')

const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskName = document.querySelector('[data-new-task-name]')
const newTaskTime = document.querySelector('[data-new-task-time]')

const LOCAL_STORAGE_DATA_KEY = "task.data"

let taskList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA_KEY)) || []

let checkValue = JSON.parse(localStorage.getItem("checkbox_value")) || []



newTaskForm.addEventListener('submit', e => {
    e.preventDefault()

    const taskName = newTaskName.value
    let taskTime = newTaskTime.value

    if (taskName == null || taskName === '') return
    if (taskTime == null || taskTime === '') taskTime = 'All Day'

    const taskObj = createTaskObj(taskName, taskTime)

    newTaskName.value = null
    newTaskTime.value = null

    taskList.push(taskObj)
    saveAndUpdate()
})

function createTaskObj(taskName, taskTime) {
    return { time: taskTime, taskname: taskName }
}


function saveAndUpdate() {
    save();
    clearAndUpdate();
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(taskList))
}


function clearAndUpdate() {
    clearData(taskTable)

    taskList.forEach(task => {
        const taskRow = document.createElement('tr')
        taskRow.classList.add("bg-white", "bg-opacity-50", "border-b", "dark:bg-gray-800", "dark:border-gray-700", "hover:bg-indigo-100", "dark:hover:bg-gray-600", "text-center")

        const taskNum = document.createElement('td')
        const taskTime = document.createElement('td')
        const taskName = document.createElement('td')
        const taskButtons = document.createElement('td')

        const checkBox = document.createElement('input')
        checkBox.setAttribute("type", "checkbox")
        checkBox.checked = checkValue[taskList.indexOf(task)]
        if (checkBox.checked == true) {
            taskTime.classList.add("checked")
            taskName.classList.add("checked")
        }

        taskNum.classList.add("text-black")
        taskTime.classList.add("text-gray-600")
        taskName.classList.add("py-3","px-3", "text-left")
        checkBox.classList.add("my-4")

        taskNum.innerText = taskList.indexOf(task) + 1
        taskTime.innerHTML = task.time
        taskName.innerHTML = task.taskname
        taskButtons.innerHTML = `<a href="#" onclick="edit(this)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
        <a href="#" onclick="deleteThis(this)" class="pl-10 font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>`

        taskRow.append(taskNum, taskTime, taskName, checkBox, taskButtons)

        taskTable.appendChild(taskRow)

    })
}

function clearData(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

clearAndUpdate()

function deleteAll() {
    taskList = []
    saveAndUpdate()
}

function deleteThis(button) {
    let row = button.parentNode.parentNode;
    let rowNum = row.getElementsByTagName('td')[0].innerText;

    taskList.splice((rowNum - 1), 1);

    saveAndUpdate()
}


// Store checkvalue in localStorage...

const checkboxes = taskTable.querySelectorAll("input[type=checkbox]")
checkboxes.forEach(chkbox => {
    chkbox.addEventListener("click", () => {

        let timeDone = chkbox.parentNode.getElementsByTagName("td")[1]
        let taskDone = chkbox.parentNode.getElementsByTagName("td")[2]

        timeDone.classList.toggle("checked");
        taskDone.classList.toggle("checked");

        checkValue = []

        checkboxes.forEach(cbox => {

            checkValue.push(cbox.checked);

        })

        localStorage.setItem('checkbox_value', JSON.stringify(checkValue))

    })

})

//edit button
function edit(button){
    let editTask = button.parentNode.parentNode.getElementsByTagName('td')[2]
    let editTime = button.parentNode.parentNode.getElementsByTagName('td')[1]
    const taskNum = button.parentNode.parentNode.getElementsByTagName('td')[0].innerText

    if(button.innerText == "Edit"){
        button.classList.toggle("edit-save")
        button.style.color = "white"
        
        button.innerText = "Save"
        
        
        editTask.contentEditable = true
        editTime.contentEditable = true
        editTask.style.backgroundColor = "white"
        editTime.style.backgroundColor = "white"
        
        
    }
    else if(button.innerText == "Save"){
        button.innerText = "Edit"
        button.classList.toggle("edit-save")
        button.style.color = "#2563EB"
        
        editTask.contentEditable = false
        editTime.contentEditable = false
        editTask.style.backgroundColor = ""
        editTime.style.backgroundColor = ""
    }
}
